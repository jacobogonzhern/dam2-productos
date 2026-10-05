import { Injectable, signal } from '@angular/core';

// Gestiona el modo oscuro de toda la aplicación
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'modo-oscuro';

  // signal: Angular repinta solo los componentes que lo leen (funciona en modo zoneless)
  readonly isDark = signal(this.initialValue());

  constructor() {
    this.apply(this.isDark());
  }

  toggle(): void {
    this.isDark.update(dark => !dark);
    this.apply(this.isDark());
    try {
      localStorage.setItem(this.storageKey, String(this.isDark())); // recuerda la elección
    } catch { /* navegación privada: no se guarda, pero funciona igual */ }
  }

  // Ionic activa su paleta oscura cuando <html> tiene la clase "ion-palette-dark"
  private apply(dark: boolean): void {
    document.documentElement.classList.toggle('ion-palette-dark', dark);
  }

  // Primera vez: usa la preferencia del sistema; después, la última elección del usuario
  private initialValue(): boolean {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved !== null) return saved === 'true';
    } catch { /* sin acceso a localStorage */ }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }
}
