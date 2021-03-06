import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjemplosComponent} from './ejemplos/ejemplos.component';
import { HomeComponent } from './container/home/home.component';
import { Registro1Component } from './container/registro1/registro1.component';
import { LoginComponent } from './container/login/login.component';
import { InicioComponent } from './container/inicio/inicio.component';
import { Registro2Component } from './container/registro2/registro2.component';
import { PerfilprogComponent } from './container/perfilprog/perfilprog.component';
import { PerfiluserComponent } from './container/perfiluser/perfiluser.component';
import { PagosComponent } from './container/pagos/pagos.component';
import { ProyectoComponent } from './container/proyecto/proyecto.component';
import { AprobaremailComponent } from './container/aprobaremail/aprobaremail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registroUser', component: Registro1Component},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'registroProg', component: Registro2Component},
  {path: 'perfilProg', component: PerfilprogComponent},
  {path: 'perfilUser', component: PerfiluserComponent},
  {path: 'pagos', component: PagosComponent},
  {path: 'proyecto', component: ProyectoComponent},
  {path: 'cEmail', component: AprobaremailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
