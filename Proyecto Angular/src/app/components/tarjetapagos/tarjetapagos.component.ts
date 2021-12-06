import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tarjetapagos',
  templateUrl: './tarjetapagos.component.html',
  styleUrls: ['./tarjetapagos.component.css']
})
export class TarjetapagosComponent implements OnInit {

  BASE_API: string = environment.BASE_API;
  proyecto:any = {};
  numTarget:string;


  constructor(
    public client: ClientService
  ) { }

  ngOnInit(): void {
    let idprog = localStorage.getItem('idprog').split(',')[1];
    let iduser = localStorage.getItem('iduser');
      
   
    this.client.getRequestAllProducts(`${this.BASE_API}/selectpropuesta?idprog=${idprog}&iduser=${iduser}`).subscribe(
      (response: any) => {
        console.log(response);
        this.proyecto = response[0];
    },
    (error) => {
      console.log(error.status);
    })

    let inputTarget = document.getElementById('inputTarget');

    inputTarget.addEventListener('keyup',(event)=>{
      let numCharacters = this.numTarget.toString().length;
  
      if(numCharacters == 4 || numCharacters == 9 || numCharacters == 14) this.numTarget += ' '

    })


  }
}
