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

import { KeysPipe } from './pipes/keys.pipe';

//Services
import {ProfesionesService} from "./services/profesiones.service";
import {AsociacionesService} from "./services/asociaciones.service";
<<<<<<< HEAD
import {SolicitanteService} from "./services/solicitante.service";
import { HomeComponent } from './components/user/home/home.component';
//import {RegistradoService} from "./services/registrado.service";
=======
import { LoginComponent } from './components/login/login.component';
>>>>>>> e8bef96638aee5b44f1fd92fe4c61f0240ea6634

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    KeysPipe,
    UsuariosComponent,
    AsociacionesComponent,
<<<<<<< HEAD
    RegistroLoginComponent,
    HomeComponent
=======
    LoginComponent
>>>>>>> e8bef96638aee5b44f1fd92fe4c61f0240ea6634
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
