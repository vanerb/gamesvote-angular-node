import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip } from 'rxjs';
import { DEMO_PASSWORD, DEMO_USERS } from './demo-seed';
import { resetDemo } from './demo-api.interceptor';

const COLLAPSED_KEY = 'gamesvote-demo-banner-collapsed';

/** Aviso flotante de la demo: explica que no hay servidor, muestra las cuentas de prueba y permite restablecer los datos. */
@Component({
  selector: 'app-demo-banner',
  standalone: true,
  template: `
    @if (collapsed()) {
      <button type="button" class="demo-pill" (click)="toggle()" aria-label="Mostrar información de la demo">
        <i class="bi bi-info-circle"></i> Demo
      </button>
    } @else {
      <aside class="demo-card" aria-label="Información de la demo">
        <header>
          <strong><i class="bi bi-controller"></i> Demo sin servidor</strong>
          <button type="button" class="icon" (click)="toggle()" aria-label="Ocultar aviso"><i class="bi bi-x-lg"></i></button>
        </header>
        <p>
          La API está simulada en tu navegador: los juegos son un catálogo de muestra y lo que hagas
          (valoraciones, registro, perfil) se guarda solo aquí.
        </p>
        <p class="accounts-title">Cuentas de prueba <span>(contraseña <code>{{ password }}</code>)</span></p>
        <ul>
          @for (user of users; track user.id) {
            <li><code>{{ user.email }}</code></li>
          }
        </ul>
        <button type="button" class="reset" (click)="reset()"><i class="bi bi-arrow-counterclockwise"></i> Restablecer demo</button>
      </aside>
    }
  `,
  styles: `
    :host { position: fixed; right: 16px; bottom: 16px; z-index: 1000; font-size: 12px; color: #f6f4ff; }
    .demo-card { width: min(320px, calc(100vw - 32px)); padding: 14px 16px; border: 1px solid rgba(185, 137, 244, .35); border-radius: 14px; background: rgba(23, 25, 35, .97); box-shadow: 0 18px 42px rgba(0, 0, 0, .5); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 13px; }
    header i { font-size: 14px; color: #c59bff; }
    p { margin: 8px 0 0; line-height: 1.45; color: #c3bdcf; }
    .accounts-title { color: #f6f4ff; font-weight: 600; }
    .accounts-title span { font-weight: 400; color: #aaa6b8; }
    ul { margin: 4px 0 0; padding-left: 18px; }
    code { color: #d9c2ff; font-size: 11.5px; }
    button { font: inherit; cursor: pointer; }
    .icon { border: 0; background: none; color: #aaa6b8; padding: 2px; }
    .icon i { font-size: 13px; color: inherit; }
    .reset { margin-top: 12px; width: 100%; padding: 8px; border: 1px solid rgba(185, 137, 244, .45); border-radius: 10px; color: #f6f4ff; background: rgba(157, 99, 255, .18); }
    .reset:hover { background: rgba(157, 99, 255, .32); }
    .reset i, .demo-pill i { font-size: 13px; }
    .demo-pill { display: flex; align-items: center; gap: 6px; padding: 7px 12px; border: 1px solid rgba(185, 137, 244, .45); border-radius: 999px; color: #f6f4ff; background: rgba(23, 25, 35, .95); }
  `,
})
export class DemoBanner {
  protected readonly users = DEMO_USERS;
  protected readonly password = DEMO_PASSWORD;
  protected readonly collapsed = signal(readCollapsed());

  constructor(router: Router) {
    // Al cambiar de pantalla se pliega para no tapar formularios ni botones
    router.events
      .pipe(filter(event => event instanceof NavigationEnd), skip(1), takeUntilDestroyed())
      .subscribe(() => this.setCollapsed(true));
  }

  protected toggle(): void {
    this.setCollapsed(!this.collapsed());
  }

  private setCollapsed(value: boolean): void {
    this.collapsed.set(value);
    try {
      sessionStorage.setItem(COLLAPSED_KEY, String(value));
    } catch {
      // sin almacenamiento solo se pierde la preferencia
    }
  }

  protected reset(): void {
    if (!confirm('¿Borrar todos los cambios hechos en la demo y cerrar la sesión?')) return;
    resetDemo();
    location.reload();
  }
}

function readCollapsed(): boolean {
  try {
    return sessionStorage.getItem(COLLAPSED_KEY) === 'true';
  } catch {
    return false;
  }
}
