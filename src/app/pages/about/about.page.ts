import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
} from '@ionic/angular';

import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    ThemeToggleComponent,
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
  ],
})
export class AboutPage {
  empresa = 'JG Dev Solutions';
  githubUrl = 'https://github.com/jacobogonzhern';
}
