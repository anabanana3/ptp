import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/admin/usuarios.component';
import { AsociacionesComponent } from './components/admin/asociaciones.component';
import { RegistroLoginComponent } from './components/registro/registroLogin.component';
import { HomeComponent } from './components/user/home/home.component';
import { HomeAsociaciones } from './components/asociaciones/homeAsociaciones.component';
<<<<<<< HEAD
import {LoginComponent} from './components/login/login.component';
=======
>>>>>>> 3bccd87fb0586c446c14f548fa5bcd7141d14ddd

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
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'asociaciones',
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
    path: 'homeAsociacion',
    component: HomeAsociaciones,
    data: { title: 'Home' }
  },
  { path: '**', pathMatch: 'full', redirectTo: 'registro' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
