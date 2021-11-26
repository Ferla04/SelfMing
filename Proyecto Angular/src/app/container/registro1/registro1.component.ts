import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { FrontService } from '../../servicios/front.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro1',
  templateUrl: './registro1.component.html',
  styleUrls: ['./registro1.component.css']
})

export class Registro1Component implements OnInit {
  
  BASE_API: string = environment.BASE_API;
  form: FormGroup;
  load: boolean = true;

  constructor(
    public client: ClientService,
    public front: FrontService,
    private fb: FormBuilder,
    private route: Router
    ) {
  }
  
  ngOnInit(): void {
    let inputs:any = document.querySelectorAll('.inputs');
    let label:any = document.querySelectorAll('.label');
    let ver:any = document.getElementById('ver');

    //servicios
    this.front.ojo(inputs,label,ver,3);

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.email],
      celular: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //servicios 
  mostrarpass(){
    let tipo = document.getElementById('inputMostrar');
    let ver:any = document.getElementById('ver');
    this.front.mostrarpass2(tipo,ver);
  }

  async onSubmit() {
    if (this.form.valid) {
      this.load = false;
      this.client.postRequestSendForm(`${this.BASE_API}/registrouser`, {
        nombre: this.form.value.nombre,
        correo: this.form.value.email,
        celular: this.form.value.celular,
        password: this.form.value.password
      }).subscribe(
        (response: any) => {
          console.log(response);
          // localStorage.setItem('email', response.email)
          // sessionStorage.setItem('pass', response.password)
          //console.log(localStorage.getItem('email'));
            
          if(response.status != 'correo ya existente'){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Su registro ha sido exitoso',
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(()=>{ this.route.navigate( ['/login']) }, 1500);
          }
          console.log(response.status);
          this.load = true;           
      },

      (error) => {
        this.load = true;
        console.log(error.status);
        console.log(error.error.errors);
      })
      
    } else {
      console.log("Form error");
    }
  
  }


}


