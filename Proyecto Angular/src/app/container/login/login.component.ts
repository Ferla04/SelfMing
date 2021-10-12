import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { FrontService } from '../../servicios/front.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
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
    this.front.ojo(inputs,label,ver,1);

    this.form = this.fb.group({
      email: ['', Validators.email],
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
      this.client.postRequestSendForm('http://localhost:10101/login', {
        correo: this.form.value.email,
        password: this.form.value.password
      }).subscribe(
        (response: any) => {
          console.log(response);
          //se guarda el valor de la propiedad token en el almacenamiento local persistente
          localStorage.setItem('token', response.token)
          //recuperamos el valor de  token  guardada anteriormete y la imprimimos
          console.log(localStorage.getItem('token'));
          //dirigimos al usuario a la ruta /Inicio
          this.route.navigate( ['/inicio']);

      },

      (error) => {
        this.load = true;
        console.log(error.status);
      })
      
    } else {
      console.log("Form error");
    }
  }
}

