import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { defer, delay, from } from 'rxjs';
import { Games } from '../interfaces/games';
import { DEMO_GAMES, DEMO_USERS, DEMO_VALORATIONS, DemoUser, DemoValoration } from './demo-seed';

import { environment } from '../../environments/environment';
/**
 * Réplica en el navegador de la API de Express (mismas rutas y respuestas) para que
 * la demo de GitHub Pages funcione sin servidor. Los datos se guardan en localStorage.
 */

const API = environment.apiUrl + '/';
const STORAGE_KEY = 'gamesvote-demo-db';

interface DemoDb {
  users: DemoUser[];
  valorations: DemoValoration[];
  nextUserId: number;
  nextValorationId: number;
}

class DemoError {
  constructor(readonly status: number, readonly message: string) {}
}

const fail = (status: number, message: string): never => {
  throw new DemoError(status, message);
};

function freshDb(): DemoDb {
  return {
    users: structuredClone(DEMO_USERS),
    valorations: structuredClone(DEMO_VALORATIONS),
    nextUserId: DEMO_USERS.length + 1,
    nextValorationId: DEMO_VALORATIONS.length + 1,
  };
}

function loadDb(): DemoDb {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // datos corruptos o almacenamiento bloqueado: se parte de la semilla
  }
  return freshDb();
}

function saveDb(db: DemoDb): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // sin almacenamiento la demo sigue funcionando hasta recargar
  }
}

/** Borra los cambios hechos en la demo y cierra la sesión. */
export function resetDemo(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('token');
  localStorage.removeItem('type');
}

// ------------------------------------------------------------------ formato de respuestas

function userImages(user: DemoUser) {
  return user.image
    ? [{ id: user.id, url: user.image, from: 'user', fromId: user.id, createdAt: user.updatedAt, updatedAt: user.updatedAt }]
    : [];
}

function publicUser(user: DemoUser) {
  const { password, image, ...rest } = user;
  return { ...rest, typ: user.type, token: tokenFor(user), Images: userImages(user) };
}

function withUser(db: DemoDb, valoration: DemoValoration) {
  const user = db.users.find(u => u.id === valoration.userId);
  return { ...valoration, User: user ? { ...publicUser(user) } : { email: 'usuario@gamesvote.demo', Images: [] }, Images: [] };
}

function withGame(db: DemoDb, valoration: DemoValoration) {
  const game: Games = DEMO_GAMES.find(g => g.id === Number(valoration.gameId)) ?? { id: Number(valoration.gameId), name: 'Juego no encontrado' };
  return { ...withUser(db, valoration), game };
}

// ------------------------------------------------------------------ utilidades de petición

const tokenFor = (user: DemoUser) => `demo-token-${user.id}`;

function viewer(db: DemoDb, req: HttpRequest<unknown>): DemoUser | null {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '') || localStorage.getItem('token');
  const id = Number(token?.replace('demo-token-', ''));
  return db.users.find(u => u.id === id) ?? null;
}

const auth = (db: DemoDb, req: HttpRequest<unknown>) => viewer(db, req) ?? fail(401, 'No autorizado');

function field(body: unknown, key: string): string {
  if (body instanceof FormData) {
    const value = body.get(key);
    return typeof value === 'string' ? value.trim() : '';
  }
  const value = (body as Record<string, unknown> | null)?.[key];
  return value == null ? '' : String(value).trim();
}

function fileAsDataUrl(body: unknown, key: string): Promise<string | null> {
  const file = body instanceof FormData ? body.get(key) : null;
  if (!(file instanceof File) || !file.size) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// ------------------------------------------------------------------ juegos (IGDB)

function searchGames(req: HttpRequest<unknown>) {
  const search = (req.params.get('search') || '').toLowerCase();
  const page = Math.max(1, Number(req.params.get('page')) || 1);
  const limit = Math.max(1, Number(req.params.get('limit')) || 27);
  let filters: { genres?: number[]; platforms?: number[]; minRating?: number; maxRating?: number; sortBy?: string; sortOrder?: string } = {};
  try {
    filters = JSON.parse(req.params.get('filters') || '{}');
  } catch {
    // filtros mal formados: se ignoran
  }

  let games = DEMO_GAMES.filter(g => (g.name ?? '').toLowerCase().includes(search));
  if (filters.genres?.length) games = games.filter(g => g.genres?.some(x => filters.genres!.includes(x.id)));
  if (filters.platforms?.length) games = games.filter(g => g.platforms?.some(x => filters.platforms!.includes(x.id)));
  if (filters.minRating != null) games = games.filter(g => (g.rating ?? 0) / 10 >= Number(filters.minRating));
  if (filters.maxRating != null && Number(filters.maxRating) < 10) games = games.filter(g => (g.rating ?? 0) / 10 <= Number(filters.maxRating));
  if (filters.sortBy) {
    const key = filters.sortBy as keyof Games;
    const dir = filters.sortOrder === 'desc' ? -1 : 1;
    games = [...games].sort((a, b) => {
      const av = a[key] ?? 0;
      const bv = b[key] ?? 0;
      return (typeof av === 'string' ? av.localeCompare(String(bv)) : Number(av) - Number(bv)) * dir;
    });
  }
  return games.slice((page - 1) * limit, page * limit);
}

// ------------------------------------------------------------------ rutas

async function handle(req: HttpRequest<unknown>): Promise<unknown> {
  const path = req.url.slice(API.length - 1).split('?')[0].replace(/\/+$/, '') || '/';
  const method = req.method;
  const db = loadDb();
  let match: RegExpMatchArray | null;

  // juegos
  if (method === 'GET' && path === '/api/igdb/getAllGames') return searchGames(req);
  if (method === 'GET' && (match = path.match(/^\/api\/igdb\/getGameById\/(\d+)$/))) {
    return DEMO_GAMES.filter(g => g.id === Number(match![1]));
  }

  // autenticación y usuario
  if (method === 'POST' && path === '/api/auth/login') {
    const email = field(req.body, 'email').toLowerCase();
    const user = db.users.find(u => u.email.toLowerCase() === email) ?? fail(400, 'Usuario no encontrado');
    if (user.password !== field(req.body, 'password')) fail(400, 'Contraseña incorrecta');
    return { message: 'Login exitoso', access_token: tokenFor(user), type: user.type };
  }
  if (method === 'POST' && path === '/api/auth/register') {
    const email = field(req.body, 'email').toLowerCase();
    if (!email || !field(req.body, 'password')) fail(400, 'Faltan datos obligatorios');
    if (db.users.some(u => u.email.toLowerCase() === email)) fail(400, 'El usuario ya existe');
    const now = new Date().toISOString();
    const user: DemoUser = {
      id: db.nextUserId++, name: field(req.body, 'name'), cognames: field(req.body, 'cognames'), tlf: field(req.body, 'tlf'),
      email, password: field(req.body, 'password'), type: field(req.body, 'type') || 'user',
      image: await fileAsDataUrl(req.body, 'profileImage'), createdAt: now, updatedAt: now,
    };
    db.users.push(user);
    saveDb(db);
    return { message: 'Usuario registrado', userWithProfile: publicUser(user) };
  }
  if (method === 'GET' && path === '/api/auth/user') return publicUser(auth(db, req));
  if (method === 'PUT' && path === '/api/user') {
    const user = auth(db, req);
    for (const key of ['name', 'cognames', 'tlf', 'password'] as const) {
      const value = field(req.body, key);
      if (value) user[key] = value;
    }
    user.image = (await fileAsDataUrl(req.body, 'profileImage')) ?? user.image;
    user.updatedAt = new Date().toISOString();
    saveDb(db);
    return publicUser(user);
  }

  // valoraciones
  if (method === 'GET' && path === '/api/valoration') return db.valorations.map(v => withUser(db, v));
  if (method === 'GET' && (match = path.match(/^\/api\/valoration\/getAllValorationsByGameId\/(\d+)$/))) {
    return db.valorations.filter(v => v.gameId === match![1]).map(v => withUser(db, v));
  }
  if (method === 'GET' && (match = path.match(/^\/api\/valoration\/getMyValorationsByGameId\/(\d+)$/))) {
    const user = auth(db, req);
    return db.valorations.filter(v => v.gameId === match![1] && v.userId === user.id).map(v => withUser(db, v));
  }
  if (method === 'GET' && path === '/api/valoration/getMyValorationsByUserId') {
    const user = auth(db, req);
    return db.valorations.filter(v => v.userId === user.id).map(v => withGame(db, v));
  }
  if (method === 'GET' && (match = path.match(/^\/api\/valoration\/getValorationByIdAndByGameId\/([^/]+)\/(\d+)$/))) {
    auth(db, req);
    const found = db.valorations.find(v => v.id === match![1] && v.gameId === match![2]) ?? fail(404, 'Valoración no encontrada');
    return withUser(db, found);
  }
  if (method === 'POST' && path === '/api/valoration') {
    const user = auth(db, req);
    const now = new Date().toISOString();
    const valoration: DemoValoration = {
      id: String(db.nextValorationId++), description: field(req.body, 'description'), value: field(req.body, 'value') || '0',
      gameId: field(req.body, 'gameId'), userId: user.id, createdAt: now, updatedAt: now,
    };
    db.valorations.push(valoration);
    saveDb(db);
    return withUser(db, valoration);
  }
  if ((match = path.match(/^\/api\/valoration\/([^/]+)$/)) && (method === 'PUT' || method === 'DELETE')) {
    const user = auth(db, req);
    const found = db.valorations.find(v => v.id === match![1]) ?? fail(404, 'Valoración no encontrada');
    if (found.userId !== user.id) fail(403, 'No puedes modificar valoraciones de otros usuarios');
    if (method === 'DELETE') {
      db.valorations = db.valorations.filter(v => v !== found);
      saveDb(db);
      return { message: 'Valoración eliminada' };
    }
    found.description = field(req.body, 'description');
    found.value = field(req.body, 'value') || found.value;
    found.updatedAt = new Date().toISOString();
    saveDb(db);
    return withUser(db, found);
  }

  return fail(404, `Ruta no disponible en la demo: ${method} ${path}`);
}

export const demoApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(API)) return next(req);

  return defer(() =>
    from(
      handle(req).then(
        body => new HttpResponse({ status: 200, body, url: req.url }),
        error => {
          const status = error instanceof DemoError ? error.status : 500;
          const message = error instanceof DemoError ? error.message : String(error);
          throw new HttpErrorResponse({ status, error: { error: message, message }, url: req.url });
        },
      ),
    ),
  ).pipe(delay(150));
};
