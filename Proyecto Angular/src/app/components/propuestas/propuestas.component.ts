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
  modalProject:boolean = false;
  proyecto:any = {};


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
          if(e.estado == 'R') e.estado = 'Rechazado';

          e.fecentrega = e.fecentrega.slice(0,10);

        });

    },
    (error) => {
      console.log(error.status);
      }
    )
  }

  irPerfilProg(idprog:string){
    localStorage.setItem('idprog', `S,${idprog}`);
    // this.route.navigate( ['/perfilProg']);
    window.open('/perfilProg', '_blank');
  }

  openProject(idprog:string){
    this.modalProject = true;


    this.client.getRequestAllProducts(`${this.BASE_API}/selectpropuesta?idprog=${idprog}&iduser=${this.id}`).subscribe(
      (response: any) => {
        console.log(response);
        this.proyecto = response[0];
        console.log(this.proyecto);


        this.proyecto.fecentrega = this.proyecto.fecentrega.slice(0,10);
        this.proyecto.archivo = `${this.proyecto.archivo.split(',')[2]}.pdf`;
        
        if(!this.proyecto.valor) this.proyecto.valor = 'No hay valor';
        this.proyecto.respuesta = (this.proyecto.respuesta)? this.proyecto.respuesta.split(',')[2] : 'No hay archivo';
        console.log(this.proyecto.respuesta)

        if(this.proyecto.estado == 'N') this.proyecto.estado = 'Enviado'; 
        if(this.proyecto.estado == 'A') this.proyecto.estado = 'Aceptado'; 
        if(this.proyecto.estado == 'P') this.proyecto.estado = 'Pagado'; 
        if(this.proyecto.estado == 'F') this.proyecto.estado = 'Finalizado'; 
        if(this.proyecto.estado == 'R') this.proyecto.estado = 'Rechazado';
        
    },
    (error) => {
      console.log(error.status);
    })

  }

}
