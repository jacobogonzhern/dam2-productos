import { ApplicationConfig } from '@angular/core';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

import { routes } from './app.routes';

// Configuración global de la aplicación (sustituye al antiguo AppModule)
export const appConfig: ApplicationConfig = {
  providers: [
    // Navegación entre páginas con las animaciones de Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Activa los componentes de Ionic (ion-button, ion-header...)
    provideIonicAngular(),
    // Registra las rutas y precarga las páginas en segundo plano
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // Permite usar HttpClient para llamar a la API REST
    provideHttpClient(),
  ],
};
