import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// main.ts solo arranca la app; la configuración vive en app.config.ts
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
