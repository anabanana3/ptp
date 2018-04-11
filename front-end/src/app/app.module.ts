import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_ROUTING} from "./app.routes";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';


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
import { ExpedientesAdminComponent } from './components/admin/expedientes.component';
import { ErrorComponent } from './components/error/error.component';
import { ExpedienteComponent } from './components/expediente/expediente.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FooterComponent } from './footer/footer.component';
import { VermasComponent } from './components/vermas/vermas.component';
import { Bloque1Component } from './components/expediente/bloque1/bloque1.component';
import { Bloque2Component, Popup2 } from './components/expediente/bloque2/bloque2.component';
import { Bloque3Component } from './components/expediente/bloque3/bloque3.component';
import { Bloque4Component } from './components/expediente/bloque4/bloque4.component';
import { Bloque5Component } from './components/expediente/bloque5/bloque5.component';
import { ExpedientesService } from './services/expedientes.service';
import { HeaderComponent } from './header/header.component';
import { MisExpedientesComponent } from './components/mis-expedientes/mis-expedientes.component';
import { RecursoComponent } from './components/recursos/añadir-recurso/añadir-recurso.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { MotorGraficoComponent } from './components/motor-grafico/motor-grafico.component';
import { RecursosAdminComponent } from './components/admin/recursos.component';
import { ChatComponent } from './components/chat/chat.component';

import { KeysPipe } from './pipes/keys.pipe';

//Services
import {ProfesionesService} from "./services/profesiones.service";
import {AsociacionesService} from "./services/asociaciones.service";
import {UserService} from "./services/user.service";
import {NoticiasService} from "./services/noticias.service";
import {MaterialService} from "./services/material.service";
import {ComentarioService} from "./services/comentario.service";
import { BibExpedientesComponent } from './components/bib-expedientes/bib-expedientes.component';
import { VerExpedienteComponent, Popup } from './components/ver-expediente/ver-expediente.component';
import { ChatService } from './services/chat.service';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';


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
    MotorGraficoComponent,
    RecursosAdminComponent,
    BibExpedientesComponent,
    RecursosAdminComponent,
    VerExpedienteComponent,
    ExpedientesAdminComponent,
    Popup,
    Popup2,
    ChatComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  entryComponents: [
    Popup,
    Popup2
  ],
  providers: [
    ProfesionesService,
    AsociacionesService,
    UserService,
    ExpedientesService,
    NoticiasService,
    MaterialService,
    ComentarioService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
