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
<<<<<<< HEAD
=======
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { VermasComponent } from './components/vermas/vermas.component';
<<<<<<< HEAD
import { CarouselSliderComponent } from './carousel-slider/carousel-slider.component';

=======
import { ExpedienteComponent } from './components/expedientes/expediente.component';

>>>>>>> 2b2ab32d610a3b78fffcf699fbee1a532b7af2b3
import { ErrorComponent } from './components/error/error.component';
>>>>>>> b2fb56308c4bbe0d9a094a7b3caf0090776a17d2

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
<<<<<<< HEAD
=======
    FooterComponent,
    HeaderComponent,
<<<<<<< HEAD
    VermasComponent
=======
    VermasComponent,
    ExpedienteComponent,
>>>>>>> 2b2ab32d610a3b78fffcf699fbee1a532b7af2b3
    ErrorComponent
>>>>>>> b2fb56308c4bbe0d9a094a7b3caf0090776a17d2
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
