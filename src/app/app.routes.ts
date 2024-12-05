// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ConfigurationFormComponent } from './components/configuration-form/configuration-form.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';

export const appRoutes: Routes = [
  { path: '', component: ConfigurationFormComponent },
  { path: 'control-panel', component: ControlPanelComponent },
];
