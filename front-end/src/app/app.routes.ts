import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/admin/usuarios.component';
import { AsociacionesComponent } from './components/admin/asociaciones.component';
import { RegistroLoginComponent } from './components/registro/registroLogin.component';
import { HomeComponent } from './components/user/home/home.component';
import { HomeAsociaciones } from './components/asociaciones/homeAsociaciones.component';
import { LoginComponent } from './components/login/login.component';
import { LateralOptionsComponent } from './components/admin/lateralOptions/lateralOptions.component';
import { ProfileUserComponent } from './components/user/profile/profileUser.component';
import { ProfileAsociacionComponent } from './components/asociaciones/profile/profileAsociacion.component';

const app_routes: Routes = [
  { path: 'admin/usuarios',
    component: UsuariosComponent ,
    data: { title: 'Usuarios' }
  },
  {
    path: 'registro',
    component: RegistroComponent,
    data: { title: 'Registro' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'admin/asociaciones',
    component: AsociacionesComponent,
    data: { title: 'Asociaciones' }
  },
  {
    path: 'registroLogin',
    component: RegistroLoginComponent,
    data: { title: 'Registro' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'asociacion',
    component: HomeAsociaciones,
    data: { title: 'Home' }
  },
  {
    path: 'user/profile',
    component: ProfileUserComponent,
    data: { title: 'profile' }
  },
  {
    path: 'asociacion/profile',
    component: ProfileAsociacionComponent,
    data: { title: 'profile' }
  },
  { path: '**', pathMatch: 'full', redirectTo: 'registro' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
