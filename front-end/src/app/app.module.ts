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
import { AgmCoreModule } from '@agm/core';


//Components
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosAdminComponent } from './components/admin/usuarios.component';
import { AsociacionesAdminComponent } from './components/admin/asociaciones.component';
import { RegistroLoginComponent } from './components/registro/registroLogin.component';
import { HomeAsociaciones } from './components/asociaciones/homeAsociaciones.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileAsociacionComponent, ProfilePopUp2 } from './components/asociaciones/profile/profileAsociacion.component';
import { ProfileUserComponent, ProfilePopUp } from './components/user/profile/profileUser.component';
import { LateralOptionsComponent } from './components/admin/lateralOptions/lateralOptions.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { HomeAdminComponent } from './components/admin/home/homeAdmin.component';
import { ExpedientesAdminComponent } from './components/admin/expedientes.component';
import { ErrorComponent } from './components/error/error.component';
import { ExpedienteComponent } from './components/expediente/expediente.component';
import { ContactoComponent, ContactPopup } from './components/contacto/contacto.component';
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
import {HistoricoComponent} from './components/user/historico/historico.component'

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
import { ExpiredSessionComponent } from './components/expired-session/expired-session.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { CarpetasService } from './services/carpetas.service';
import { HeaderAsociacionComponent } from './header/header-asociacion/header-asociacion.component';
import { HeaderAdminComponent } from './header/header-admin/header-admin.component';
import { EditarExpedienteComponent } from './components/editar-expediente/editar-expediente.component';
import { EditB1Component } from './components/editar-expediente/edit-b1/edit-b1.component';
import { EditB2Component } from './components/editar-expediente/edit-b2/edit-b2.component';
import { EditB3Component } from './components/editar-expediente/edit-b3/edit-b3.component';
import { EditB4Component } from './components/editar-expediente/edit-b4/edit-b4.component';
import { EditB5Component } from './components/editar-expediente/edit-b5/edit-b5.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    KeysPipe,
    UsuariosAdminComponent,
    AsociacionesAdminComponent,
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
    EstadisticasComponent,
    ExpiredSessionComponent,
    ContactPopup,
    PoliticaPrivacidadComponent,
    ProfilePopUp,
    ProfilePopUp2,
    HistoricoComponent,
    HeaderAsociacionComponent,
    HeaderAdminComponent,
    EditarExpedienteComponent,
    EditB1Component,
    EditB2Component,
    EditB3Component,
    EditB4Component,
    EditB5Component
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB22qgoaAWVVA8Ht3cUK4ouCfFLNiDAhEc',
      libraries: ['places']
    })
  ],
  entryComponents: [
    Popup,
    Popup2,
    ContactPopup,
    ProfilePopUp,
    ProfilePopUp2
  ],
  providers: [
    ProfesionesService,
    AsociacionesService,
    UserService,
    ExpedientesService,
    NoticiasService,
    MaterialService,
    ComentarioService,
    ChatService,
    CarpetasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
