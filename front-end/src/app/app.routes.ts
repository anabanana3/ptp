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
import { PrincipalComponent } from './components/principal/principal.component';
import { HomeAdminComponent } from './components/admin/home/homeAdmin.component';

const app_routes: Routes = [
  {
    path: 'admin/home',
    component: HomeAdminComponent,
    data: { title: 'Home' }
  },
  { path: 'admin/usuarios',
    component: UsuariosComponent ,
    data: { title: 'Usuarios' }
  },
  {
    path: 'admin/asociaciones',
    component: AsociacionesComponent,
    data: { title: 'Asociaciones' }
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
    path: 'registro2',
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
  {
    path: 'principal',
    component: PrincipalComponent,
    data: { title: 'Principal' }
  },
  { path: '**', pathMatch: 'full', redirectTo: 'principal' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);