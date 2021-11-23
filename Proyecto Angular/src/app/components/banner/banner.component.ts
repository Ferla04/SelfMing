import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {
  
  data:any[] = [];
  BASE_API: string = environment.BASE_API;
  
  constructor(
    public client: ClientService,
    private route: Router
    ) { }
    
    ngOnInit(): void {
      let tokenId = localStorage.getItem('id');
      let signUp = tokenId.split(',')[0];
      let id = tokenId.split(',')[1];

      this.client.getRequestAllProducts(`${this.BASE_API}/traerprog?id=${id}`).subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
          console.log(response);
          this.data = response;   
      },
      //si ocurre un error en el proceso de envío del formulario...
      (error) => {
          //se imprime el status del error
          console.log(error.status);
          // this.route.navigate( ['/']);
          }
        )         
    }
       
  hacerPago(){
    this.client.getRequestAllProducts(`${this.BASE_API}/verificartoken`).subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        console.log(response);
        this.route.navigate( ['/pagos']);

    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      //se imprime el status del error
      console.log(error.status);
      // this.route.navigate( ['/']);
      }
    )
  }

  hacerPropuesta(){
    this.client.getRequestAllProducts(`${this.BASE_API}/verificartoken`).subscribe(
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

 // async getAdmins(idprog){
        //   try {
        //     const resPieces = await fetch(`${this.BASE_API}/traerprog?id=${idprog}`,{
        //       method: 'GET',
        //       headers: { "Content-type": "application/json" }
        //     })
        //     const data = await resPieces.json(); 
        //     this.data = data;
            
        //   } catch (error) {
        //     console.log(error);
        //   }
          
        // }