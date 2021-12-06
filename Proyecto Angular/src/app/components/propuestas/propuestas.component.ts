import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-propuestas',
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {

  BASE_API: string = environment.BASE_API;
  id:any;
  propuestas:any;

  constructor(
    public client: ClientService,
    private route: Router
  ) { }

  ngOnInit(): void {

    this.id = localStorage.getItem('iduser');

    this.client.getRequestAllProducts(`${this.BASE_API}/traerproyecto?id=${this.id}&campo=usuario`).subscribe(
      (response: any) => {
        console.log(response);
        this.propuestas = response;
        this.propuestas.forEach(e => {
          if(e.estado == 'N') e.estado = 'Enviado'; 
          if(e.estado == 'A') e.estado = 'Aceptado'; 
          if(e.estado == 'P') e.estado = 'Pagado'; 
          if(e.estado == 'F') e.estado = 'Finalizado'; 

          e.fecentrega = e.fecentrega.slice(0,10);
        });

    },
    (error) => {
      console.log(error.status);
      }
    )
  }

  // verProyecto(){
  //   this.client.getRequestAllProducts(`${this.BASE_API}/hacerPropuesta`).subscribe(
  //     //cuando la respuesta del server llega es emitida por el observable mediante next()..
  //     (response: any) => {
  //       console.log(response);
  //       this.route.navigate( ['/proyecto']);
  
  //   },
  //   //si ocurre un error en el proceso de envío del formulario...
  //   (error) => {
  //     //se imprime el status del error
  //     console.log(error.status);
  //     }
  //   )
  // }

  irPerfilProg(){

  }
}
