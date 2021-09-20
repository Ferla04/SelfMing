import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(public client: ClientService) { }

  ngOnInit(): void {
  }

  hacerPago(){
    this.client.getRequestAllProducts("http://localhost:10101/pagar").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        console.log(response);
  
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      //se imprime el status del error
      console.log(error.status);
      }
    )
  }

}
