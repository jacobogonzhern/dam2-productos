import { Component, inject } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';
import { ThemeService } from '../../services/theme.service';

// Botón reutilizable de modo oscuro: se coloca en la barra de cada página
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [IonButton, IonIcon],
  template: `
    <ion-button (click)="theme.toggle()"
                [attr.aria-label]="theme.isDark() ? 'Activar modo claro' : 'Activar modo oscuro'">
      <ion-icon slot="icon-only" [name]="theme.isDark() ? 'sunny' : 'moon'"></ion-icon>
    </ion-button>
  `,
})
export class ThemeToggleComponent {
  theme = inject(ThemeService);

  constructor() {
    addIcons({ moon, sunny }); // en standalone hay que registrar los iconos que se usan
  }
}
