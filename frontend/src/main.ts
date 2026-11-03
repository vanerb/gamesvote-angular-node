import 'zone.js'; // 👈 agregar esta línea al inicio
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { environment } from './environments/environment';
import { demoApiInterceptor } from './app/demo/demo-api.interceptor';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch(), withInterceptors(environment.demo ? [demoApiInterceptor] : [])),
    provideRouter(routes),
    provideClientHydration(),
  ],
}).catch(err => console.error(err));
