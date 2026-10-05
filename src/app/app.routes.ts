import { Routes } from '@angular/router';

export const routes: Routes = [
  // Al entrar en la raíz se redirige a /inicio
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // Lazy loading: cada página se descarga solo cuando se visita
  { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio.page').then(m => m.InicioPage) },
  { path: 'productos', loadComponent: () => import('./pages/productos/productos.page').then(m => m.ProductosPage) },
  { path: 'about', loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage) },

  // Cualquier ruta desconocida vuelve a /inicio
  { path: '**', redirectTo: 'inicio' },
];
