import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/admin/usuarios.component';
import { AsociacionesComponent } from './components/admin/asociaciones.component';

const app_routes: Routes = [
  { path: 'usuarios',
    component: UsuariosComponent ,
    data: { title: 'Usuarios' }
  },
  {
    path: 'registro',
    component: RegistroComponent,
    data: { title: 'Registro' }
  },
  {
    path: 'asociaciones',
    component: AsociacionesComponent,
    data: { title: 'Asociaciones' }
  },
  { path: '**', pathMatch: 'full', redirectTo: 'usuarios' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
