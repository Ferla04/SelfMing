import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EjemplosComponent } from './ejemplos/ejemplos.component';
import { Registro1Component } from './container/registro1/registro1.component';
import { HomeComponent} from './container/home/home.component';
import { LoginComponent } from './container/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { BombilloComponent } from './components/bombillo/bombillo.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './container/inicio/inicio.component';
import { NavComponent } from './components/nav/nav.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { Registro2Component } from './container/registro2/registro2.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EjemplosComponent,
    Registro1Component,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    BombilloComponent,
    FooterComponent,
    InicioComponent,
    NavComponent,
    PerfilesComponent,
    Registro2Component,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
