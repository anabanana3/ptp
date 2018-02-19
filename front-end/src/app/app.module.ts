import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_ROUTING} from "./app.routes";
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Components
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/admin/usuarios.component';
import { AsociacionesComponent } from './components/admin/asociaciones.component';
import { RegistroLoginComponent } from './components/registro/registroLogin.component';
import { HomeAsociaciones } from './components/asociaciones/homeAsociaciones.component';
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
import { VermasComponent } from './components/vermas/vermas.component';
import { Bloque1Component } from './components/expediente/bloque1/bloque1.component';
import { Bloque2Component } from './components/expediente/bloque2/bloque2.component';
import { Bloque3Component } from './components/expediente/bloque3/bloque3.component';
import { Bloque4Component } from './components/expediente/bloque4/bloque4.component';
import { Bloque5Component } from './components/expediente/bloque5/bloque5.component';
import { ExpedientesService } from './services/expedientes.service';
import { HeaderComponent } from './header/header.component';
import { MisExpedientesComponent } from './components/mis-expedientes/mis-expedientes.component';
import { RecursoComponent } from './components/recursos/añadir-recurso/añadir-recurso.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { MotorGraficoComponent } from './components/motor-grafico/motor-grafico.component';

import { KeysPipe } from './pipes/keys.pipe';

//Services
import {ProfesionesService} from "./services/profesiones.service";
import {AsociacionesService} from "./services/asociaciones.service";
import {UserService} from "./services/user.service";
import {NoticiasService} from "./services/noticias.service";

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
    Bloque3Component,
    Bloque4Component,
    Bloque5Component,
    HeaderComponent,
    FooterComponent,
    VermasComponent,
    MisExpedientesComponent,
    RecursoComponent,
    RecursosComponent,
    MotorGraficoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  providers: [
    ProfesionesService,
    AsociacionesService,
    UserService,
    ExpedientesService,
    NoticiasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
