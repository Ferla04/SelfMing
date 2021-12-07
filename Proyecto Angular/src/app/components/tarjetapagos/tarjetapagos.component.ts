import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  datos:boolean = true;


  constructor(
    public client: ClientService,
    private route: Router
  ) { }

  ngOnInit(): void {
    let idprog = localStorage.getItem('idprog').split(',')[1];
    let iduser = localStorage.getItem('iduser');

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
    
    if(!iduser) this.datos = false;
   
    this.client.getRequestAllProducts(`${this.BASE_API}/selectpropuesta?idprog=${idprog}&iduser=${iduser}`).subscribe(
      (response: any) => {
        this.proyecto = response[0];
    },
    (error) => {
      console.log(error.status);
    })

  }

  tarjetaProg(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Tarjeta Guardada',
      showConfirmButton: false,
      timer: 1500
    });
  }

  tarjetaUser(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Pago Exitoso',
      showConfirmButton: false,
      timer: 1500
    });
    this.client.putRequestSendForm(`${this.BASE_API}/actualizarestado`, {
      proyecto: this.proyecto.idproyecto,
      estado: 'P',
      valor: this.proyecto.valor
    }).subscribe(res => {
      console.log('respuesta:', res);
      setTimeout(()=>{ this.route.navigate( ['/perfilUser']) }, 1500);
    },
    (error) => {
      console.log(error.status);
    })

  }
}
