import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_ROUTING} from "./app.routes";

//Components
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/admin/usuarios.component';
import { AsociacionesComponent } from './components/admin/asociaciones.component';
import { RegistroLoginComponent } from './components/registro/registroLogin.component';
import { HomeAsociaciones } from './components/asociaciones/homeAsociaciones.component';

import { KeysPipe } from './pipes/keys.pipe';

//Services
import {ProfesionesService} from "./services/profesiones.service";
import {AsociacionesService} from "./services/asociaciones.service";
import {UserService} from "./services/user.service";
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileAsociacionComponent } from './components/asociaciones/profile/profileAsociacion.component';
import { ProfileUserComponent } from './components/user/profile/profileUser.component';
import { LateralOptionsComponent } from './components/admin/lateralOptions/lateralOptions.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { HomeAdminComponent } from './components/admin/home/homeAdmin.component';
import { ErrorComponent } from './components/error/error.component';
import { ExpedienteComponent } from './components/expediente/expediente.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    KeysPipe,
    UsuariosComponent,
    AsociacionesComponent,
    RegistroLoginComponent,
    HomeComponent,
    LoginComponent,
    HomeAsociaciones,
    ProfileAsociacionComponent,
    ProfileUserComponent,
    LateralOptionsComponent,
    PrincipalComponent,
    HomeAdminComponent,
    ErrorComponent,
    ExpedienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    ProfesionesService,
    AsociacionesService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
