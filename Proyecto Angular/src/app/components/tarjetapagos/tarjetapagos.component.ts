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
  numTarget:string = '';
  dateTarget:string = '';


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
    let date = document.getElementById('date');

    inputTarget.addEventListener('keyup',()=>{
      this.numTarget = this.numTarget
      .replace(/\s/g,'')
      .replace(/\D/g,'')
      .replace(/([0-9]{4})/g, '$1 ')
      .trim()
    })
    date.addEventListener('keyup', () => {
      this.dateTarget = this.dateTarget
      .replace(/\s/g,'')
      .replace(/\D/g,'')
      .replace(/([0-9]{2})/g, '$1/')
      .slice(0,this.dateTarget.length)
    })

  }
}
