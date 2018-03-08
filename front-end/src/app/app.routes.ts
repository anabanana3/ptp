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
import { ExpedienteComponent} from './components/expediente/expediente.component';
import { ContactoComponent} from './components/contacto/contacto.component';
import { VermasComponent} from './components/vermas/vermas.component';
import { MisExpedientesComponent } from './components/mis-expedientes/mis-expedientes.component';
import { RecursoComponent } from './components/recursos/añadir-recurso/añadir-recurso.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { MotorGraficoComponent } from './components/motor-grafico/motor-grafico.component';
import { BibExpedientesComponent} from './components/bib-expedientes/bib-expedientes.component';
import { VerExpedienteComponent } from './components/ver-expediente/ver-expediente.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

const app_routes: Routes = [
  {
    path: 'admin',
    component: LateralOptionsComponent,
    data: { title: 'Admin' }
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
    path: 'estadisticas',
    component: EstadisticasComponent,
    data: { title: 'Estadisticas' }
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
    path: '',
    component: PrincipalComponent,
    data: { title: 'Principal' }
  },
  {
    path: 'expediente',
    component: ExpedienteComponent,
    data: { title: 'Expediente' }
  },
  {
    path: 'contacto',
    component: ContactoComponent,
    data: { title: 'Contacto' }
  },
  {
    path: 'vermas',
    component: VermasComponent,
    data: { title: 'vermas' }
  },
  {
    path: 'misexpedientes',
    component: MisExpedientesComponent,
    data:{title: 'MisExpedientes'}
  },
  {
    path: 'bibexpedientes',
    component: BibExpedientesComponent,
    data:{title: 'MisExpedientes'}
  },
  {
    path: 'recurso',
    component: RecursoComponent,
    data:{title: 'Recurso'}
  },
  {
    path: 'recurso/:id',
    component: RecursoComponent,
    data:{title: 'Recurso'}
  },
  {
    path: 'recursos',
    component: RecursosComponent,
    data:{title: 'Recursos'}
  },
  {
    path: 'aulavirtual',
    component: MotorGraficoComponent,
    data:{title: 'Motor Grafico'}
  },
  {
    path: 'verexpediente',
    component: VerExpedienteComponent,
    data:{title: 'Ver Expediente'}
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
