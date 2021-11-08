import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { FrontService } from '../../servicios/front.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 

export class LoginComponent implements OnInit {

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
      this.client.postRequestSendForm(`${this.BASE_API}/login`, {
        correo: this.form.value.email,
        password: this.form.value.password
      }).subscribe(
        (response: any) => {
          console.log(response);
          console.log(response.status);

          if(response.status != 'Cuenta Inactiva'){
            localStorage.setItem('token', response.token)
            console.log(localStorage.getItem('token'));
            this.route.navigate(['/inicio']);
          }else if(response.status == 'Cuenta Inactiva'){
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Cuenta Inactiva :(',
              text: 'Revisa tu correo',
              showConfirmButton: false,
              timer: 1500
            });
          }
          this.load = true;
        },
        
      (error) => {
        this.load = true;
        if(error.status == 422){
          console.log(error.error.errors);
          return;
        }else if(error.status == 401){
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Usuario y/o password incorrectas',
            showConfirmButton: false,
            timer: 1800
          });
        }

        console.log(error.status);
        console.log(error.error.status);

      })
      
    } else {
      console.log("Form error");
    }
  }
}

