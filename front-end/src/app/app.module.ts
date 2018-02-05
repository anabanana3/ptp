import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
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
import { ContactoComponent } from './components/contacto/contacto.component';
import { FooterComponent } from './footer/footer.component';
import { VermasComponent } from './vermas/vermas.component';
import { Bloque1Component } from './components/expediente/bloque1/bloque1.component';
import { Bloque2Component } from './components/expediente/bloque2/bloque2.component';
import { Bloque5Component } from './components/expediente/bloque5/bloque5.component';
import { ExpedientesService } from './services/expedientes.service';
import { HeaderComponent } from './header/header.component';

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
    ExpedienteComponent,
    ContactoComponent,
    PrincipalComponent,
    HomeAdminComponent,
    ErrorComponent,
    Bloque1Component,
    Bloque2Component,
    Bloque5Component,
    HeaderComponent,
    FooterComponent,
    VermasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    ReactiveFormsModule
  ],
  providers: [
    ProfesionesService,
    AsociacionesService,
    UserService,
    ExpedientesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
