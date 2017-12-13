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
import {SolicitanteService} from "./services/solicitante.service";
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/login/login.component';

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
    HomeAsociaciones
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
    SolicitanteService,
    //RegistradoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
