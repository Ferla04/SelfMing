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

  irPerfilProg(idprog){
    localStorage.setItem('idprog', `S,${idprog}`);
    // this.route.navigate( ['/perfilProg']);
    window.open('/perfilProg', '_blank');
  }
}
