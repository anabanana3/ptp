import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/admin/usuarios.component';

const app_routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  {
    path: 'registro',
    component: RegistroComponent,
    data: { title: 'Registro' }
  },
  { path: '**', pathMatch: 'full', redirectTo: 'usuarios' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
