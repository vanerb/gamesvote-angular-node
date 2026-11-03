import { Games } from '../interfaces/games';

/** Datos de muestra de la demo de GitHub Pages (sustituyen a la base de datos y a IGDB). */

export const DEMO_PASSWORD = 'demo1234';

const cover = (id: number, code: string) => ({
  id,
  url: `//images.igdb.com/igdb/image/upload/t_thumb/${code}.jpg`,
});

const PC = { id: 6, name: 'PC (Microsoft Windows)' };
const PS4 = { id: 48, name: 'PlayStation 4' };
const PS5 = { id: 167, name: 'PlayStation 5' };
const XONE = { id: 49, name: 'Xbox One' };
const XSX = { id: 169, name: 'Xbox Series X|S' };
const SWITCH = { id: 130, name: 'Nintendo Switch' };
const PS3 = { id: 9, name: 'PlayStation 3' };
const X360 = { id: 12, name: 'Xbox 360' };

const RPG = { id: 12, name: 'Role-playing (RPG)' };
const ADVENTURE = { id: 31, name: 'Adventure' };
const SHOOTER = { id: 5, name: 'Shooter' };
const PLATFORM = { id: 8, name: 'Platform' };
const PUZZLE = { id: 9, name: 'Puzzle' };
const HACK = { id: 25, name: "Hack and slash/Beat 'em up" };
const TACTICAL = { id: 24, name: 'Tactical' };
const INDIE = { id: 32, name: 'Indie' };
const RACING = { id: 10, name: 'Racing' };

export const DEMO_GAMES: Games[] = [
  {
    id: 119133, name: "Baldur's Gate 3", cover: cover(1, 'co670h'), rating: 95,
    first_release_date: 1691020800, genres: [RPG, TACTICAL, ADVENTURE], platforms: [PC, PS5, XSX],
    summary: 'Reúne a tu grupo y vuelve a los Reinos Olvidados en una historia de amistad, traición, sacrificio y supervivencia.',
    storyline: 'Un renacuajo de azotamentes te ha infectado. Resiste la corrupción o abraza su poder mientras buscas una cura.',
    involved_companies: [{ id: 1, company: { id: 1, name: 'Larian Studios' } }],
  },
  {
    id: 119171, name: 'Elden Ring', cover: cover(2, 'co4jni'), rating: 94,
    first_release_date: 1645747200, genres: [RPG, ADVENTURE], platforms: [PC, PS4, PS5, XONE, XSX],
    summary: 'Levántate, Sinluz, y déjate guiar por la gracia para blandir el poder del Círculo de Elden.',
    storyline: 'Explora las Tierras Intermedias, descubre sus secretos y decide el destino de un mundo en ruinas.',
    involved_companies: [{ id: 2, company: { id: 2, name: 'FromSoftware' } }],
  },
  {
    id: 1942, name: 'The Witcher 3: Wild Hunt', cover: cover(3, 'co1wyy'), rating: 93,
    first_release_date: 1431993600, genres: [RPG, ADVENTURE], platforms: [PC, PS4, PS5, XONE, XSX, SWITCH],
    summary: 'Eres Geralt de Rivia, cazador de monstruos, en un continente devastado por la guerra.',
    storyline: 'Encuentra a Ciri, la niña de la profecía, antes de que lo haga la Cacería Salvaje.',
    involved_companies: [{ id: 3, company: { id: 3, name: 'CD Projekt RED' } }],
  },
  {
    id: 1020, name: 'Grand Theft Auto V', cover: cover(4, 'co2lbd'), rating: 90,
    first_release_date: 1379376000, genres: [SHOOTER, RACING, ADVENTURE], platforms: [PC, PS3, PS4, PS5, X360, XONE, XSX],
    summary: 'Tres criminales muy distintos se juegan el todo por el todo en una serie de atracos en Los Santos.',
    storyline: 'Michael, Franklin y Trevor deberán sobrevivir a una ciudad sin piedad, al FIB y a sí mismos.',
    involved_companies: [{ id: 4, company: { id: 4, name: 'Rockstar North' } }],
  },
  {
    id: 14593, name: 'Hollow Knight', cover: cover(5, 'co1rgi'), rating: 91,
    first_release_date: 1487894400, genres: [PLATFORM, ADVENTURE, INDIE], platforms: [PC, SWITCH, PS4, XONE],
    summary: 'Desciende a un vasto reino subterráneo de insectos y héroes, lleno de secretos y criaturas extrañas.',
    storyline: 'Explora cavernas retorcidas, combate enemigos corrompidos y desvela el misterio de Hallownest.',
    involved_companies: [{ id: 5, company: { id: 5, name: 'Team Cherry' } }],
  },
  {
    id: 71, name: 'Portal', cover: cover(6, 'co1x7d'), rating: 88,
    first_release_date: 1191888000, genres: [PUZZLE, SHOOTER], platforms: [PC, PS3, X360, SWITCH],
    summary: 'Resuelve pruebas imposibles con un dispositivo capaz de abrir portales entre dos superficies.',
    storyline: 'GLaDOS promete tarta al final de las pruebas de Aperture Science. Quizá no deberías creerla.',
    involved_companies: [{ id: 6, company: { id: 6, name: 'Valve' } }],
  },
  {
    id: 126459, name: 'Valorant', cover: cover(7, 'co2mvt'), rating: 78,
    first_release_date: 1590969600, genres: [SHOOTER, TACTICAL], platforms: [PC, PS5, XSX],
    summary: 'Un shooter táctico 5 contra 5 en el que la puntería se combina con habilidades únicas de cada agente.',
    involved_companies: [{ id: 7, company: { id: 7, name: 'Riot Games' } }],
  },
  {
    id: 112875, name: 'God of War Ragnarök', cover: cover(8, 'co5s5v'), rating: 93,
    first_release_date: 1667865600, genres: [HACK, ADVENTURE, RPG], platforms: [PS4, PS5, PC],
    summary: 'Kratos y Atreus recorren los Nueve Reinos mientras se acerca el Ragnarök.',
    storyline: 'Padre e hijo buscan respuestas y deben decidir qué están dispuestos a sacrificar.',
    involved_companies: [{ id: 8, company: { id: 8, name: 'Santa Monica Studio' } }],
  },
  {
    id: 25076, name: 'Red Dead Redemption 2', cover: cover(9, 'co1q1f'), rating: 94,
    first_release_date: 1540512000, genres: [SHOOTER, ADVENTURE], platforms: [PC, PS4, XONE],
    summary: 'La banda de Van der Linde huye mientras el fin del Salvaje Oeste se acerca.',
    storyline: 'Arthur Morgan deberá elegir entre la lealtad a su banda y sus propios principios.',
    involved_companies: [{ id: 4, company: { id: 4, name: 'Rockstar Games' } }],
  },
  {
    id: 19560, name: 'God of War', cover: cover(10, 'co1tmu'), rating: 94,
    first_release_date: 1524182400, genres: [HACK, ADVENTURE, RPG], platforms: [PS4, PC],
    summary: 'Kratos vive como un hombre más en las tierras de los dioses nórdicos junto a su hijo Atreus.',
    storyline: 'Un viaje para cumplir el último deseo de su esposa obliga a Kratos a enfrentarse a su pasado.',
    involved_companies: [{ id: 8, company: { id: 8, name: 'Santa Monica Studio' } }],
  },
  {
    id: 196451, name: 'The Last of Us Part I', cover: cover(11, 'co5xex'), rating: 89,
    first_release_date: 1662076800, genres: [SHOOTER, ADVENTURE], platforms: [PS5, PC],
    summary: 'Joel y Ellie atraviesan una América devastada por una infección.',
    storyline: 'Una misión de supervivencia se convierte en un vínculo que cambiará sus vidas.',
    involved_companies: [{ id: 9, company: { id: 9, name: 'Naughty Dog' } }],
  },
  {
    id: 16, name: 'Fallout: New Vegas', cover: cover(12, 'co1u4e'), rating: 87,
    first_release_date: 1287446400, genres: [RPG, SHOOTER], platforms: [PC, PS3, X360],
    summary: 'Recorre el desierto de Mojave tras sobrevivir a tu propio asesinato.',
    storyline: 'Facciones, casinos y un misterioso chip de platino deciden el futuro de New Vegas.',
    involved_companies: [{ id: 10, company: { id: 10, name: 'Obsidian Entertainment' } }],
  },
  {
    id: 7331, name: "Uncharted 4: A Thief's End", cover: cover(13, 'co1r7h'), rating: 92,
    first_release_date: 1462838400, genres: [SHOOTER, PLATFORM, ADVENTURE], platforms: [PS4, PS5, PC],
    summary: 'Nathan Drake vuelve a la aventura en busca del tesoro perdido del pirata Henry Avery.',
    storyline: 'Su hermano Sam reaparece y arrastra a Nate a un último gran golpe alrededor del mundo.',
    involved_companies: [{ id: 9, company: { id: 9, name: 'Naughty Dog' } }],
  },
].map(game => ({ ...game, screenshots: [], videos: [] }));

export interface DemoUser {
  id: number;
  name: string;
  cognames: string;
  tlf: string;
  email: string;
  password: string;
  type: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DemoValoration {
  id: string;
  description: string;
  value: string;
  gameId: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const stamp = '2026-10-01T10:00:00.000Z';

export const DEMO_USERS: DemoUser[] = [
  { id: 1, name: 'Laura', cognames: 'Gómez', tlf: '600111222', email: 'laura@gamesvote.demo', password: DEMO_PASSWORD, type: 'user', image: null, createdAt: stamp, updatedAt: stamp },
  { id: 2, name: 'Carlos', cognames: 'Ruiz', tlf: '600333444', email: 'carlos@gamesvote.demo', password: DEMO_PASSWORD, type: 'user', image: null, createdAt: stamp, updatedAt: stamp },
  { id: 3, name: 'Marta', cognames: 'Sanz', tlf: '600555666', email: 'marta@gamesvote.demo', password: DEMO_PASSWORD, type: 'user', image: null, createdAt: stamp, updatedAt: stamp },
];

const review = (id: number, gameId: number, userId: number, value: number, description: string, date: string): DemoValoration => ({
  id: String(id), gameId: String(gameId), userId, value: String(value), description, createdAt: date, updatedAt: date,
});

export const DEMO_VALORATIONS: DemoValoration[] = [
  review(1, 119133, 1, 10, 'Una aventura increíble. Los compañeros y las decisiones se quedan contigo mucho después de terminar.', '2026-09-20T18:20:00.000Z'),
  review(2, 1942, 1, 9, 'Las misiones secundarias están a la altura de la historia principal. Un clásico.', '2026-09-12T21:05:00.000Z'),
  review(3, 14593, 1, 9, 'Difícil pero justo. El mapa y la música son preciosos.', '2026-08-30T16:40:00.000Z'),
  review(4, 119133, 2, 9, 'Muchísima libertad y una historia que invita a experimentar en cada partida.', '2026-09-18T12:30:00.000Z'),
  review(5, 119171, 2, 10, 'Un mundo fascinante y combates que recompensan aprender de cada error.', '2026-09-17T09:15:00.000Z'),
  review(6, 25076, 2, 8, 'Lento al principio, pero el nivel de detalle es impresionante.', '2026-09-02T22:10:00.000Z'),
  review(7, 119171, 3, 8, 'Algún jefe se me atragantó, pero explorar es una maravilla.', '2026-09-10T11:00:00.000Z'),
  review(8, 71, 3, 9, 'Corto, ingenioso y con uno de los mejores finales que recuerdo.', '2026-08-21T19:45:00.000Z'),
  review(9, 112875, 3, 9, 'Combate espectacular y una relación padre-hijo muy bien escrita.', '2026-09-25T17:30:00.000Z'),
  review(10, 1942, 2, 10, 'Volví a jugarlo con la edición nueva y sigue siendo el mejor RPG de mundo abierto.', '2026-09-28T20:00:00.000Z'),
];
