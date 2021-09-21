import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {

  constructor(
    public client: ClientService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  verProyecto(){
    this.client.getRequestAllProducts("http://localhost:10101/hacerPropuesta").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        console.log(response);
        this.route.navigate( ['/proyecto']);
  
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      //se imprime el status del error
      console.log(error.status);
      }
    )
  }
}
