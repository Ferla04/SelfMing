import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { FrontService } from '../../servicios/front.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro1',
  templateUrl: './registro1.component.html',
  styleUrls: ['./registro1.component.css']
})

export class Registro1Component implements OnInit {
  form: FormGroup;

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
    this.front.ojo(4,inputs,label,ver);

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
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

  onSubmit() {
    if (this.form.valid) {
      this.client.postRequestSendForm('http://localhost:10101/registroUser', {
        nombre: this.form.value.nombre,
        usuario: this.form.value.usuario,
        correo: this.form.value.email,
        celular: this.form.value.celular,
        password: this.form.value.password
      }).subscribe(
        (response: any) => {
          console.log(response);
          // localStorage.setItem('email', response.email)
          // sessionStorage.setItem('pass', response.password)
          //console.log(localStorage.getItem('email'));
          this.route.navigate( ['/login']);

      },

      (error) => {
        console.log(error.status);
      })
      
    } else {
      console.log("Form error");
    }
  }
}
