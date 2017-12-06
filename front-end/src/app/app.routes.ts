import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';

const app_routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'registro' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
