import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {

  BASE_API: string = environment.BASE_API;

  constructor(
    public client: ClientService,
    private route: Router
  ) { }

  ngOnInit(): void { }
  
  signout(){
    localStorage.clear();
  }

  traerUsuario(){
    this.client.getRequestAllProducts(`${this.BASE_API}/verificartoken`).subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        console.log(response);
        // localStorage.setItem('idprog');
        // this.route.navigate( ['/perfilProg']);
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      //se imprime el status del error
      console.log(error.status);
      // this.route.navigate( ['/']);
      }
    )
  }
}
