import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_ROUTING} from "./app.routes";

//Components
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { KeysPipe } from './pipes/keys.pipe';

//Services
import {ProfesionesService} from "./services/profesiones.service";
import {AsociacionesService} from "./services/asociaciones.service";

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    ProfesionesService,
    AsociacionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
