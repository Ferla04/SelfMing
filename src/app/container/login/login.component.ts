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
    this.front.ojo(1,inputs,label,ver);

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

  onSubmit() {
    if (this.form.valid) {
      this.client.postRequestSendForm('http://localhost:10101/login', {
        email: this.form.value.email,
        password: this.form.value.password
      }).subscribe(
        (response: any) => {
          console.log(response);
          // localStorage.setItem('email', response.email)
          // sessionStorage.setItem('pass', response.password)
          //console.log(localStorage.getItem('email'));
          this.route.navigate( ['/inicio']);

      },

      (error) => {
        console.log(error.status);
      })
      
    } else {
      console.log("Form error");
    }
  }
}

