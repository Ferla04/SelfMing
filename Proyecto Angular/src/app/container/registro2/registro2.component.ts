import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { FrontService } from '../../servicios/front.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-registro2',
  templateUrl: './registro2.component.html',
  styleUrls: ['./registro2.component.css']
})

export class Registro2Component implements OnInit {

  BASE_API: string = environment.BASE_API;
  form: FormGroup;
  especialidad: string[] = ['Python', 'JavaScript', 'TypeScript', 'PHP', 'HTML/CSS', 'Java', 'C#', 'Ruby', 'Angular', 'React.js', 'Node.js', 'Express', 'Mongodb', 'MySQL'];
  valores:string[] = []
  valoresUnicos:string[] = []
  lista:string;
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
      password: ['', Validators.required],
      portafolio: ['', Validators.required],
      rango: ['', Validators.required],
      especialidad: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  mostrarpass(){
    let tipo = document.getElementById('inputMostrar');
    let ver:any = document.getElementById('ver');
    this.front.mostrarpass2(tipo,ver);
  }

  // Especialidades
  ShowSelected(seleccion:any):void{
    if(seleccion != 0){
      this.valores.push(seleccion)
    }
    // Quitar opción repetida
    this.valoresUnicos = this.valores.filter((valor, indice) => {
      return this.valores.indexOf(valor) === indice;
    })
    // Transformar array a string
    this.lista = this.valoresUnicos.join("  ");
  }
  // Quitar ultimo elemento del array
  quitarUltimo(){
    this.valoresUnicos.pop();
    this.valores = this.valoresUnicos;
    this.lista = this.valoresUnicos.join("  ");
  }


  async onSubmit() {
    if (this.form.valid) {
      this.load = false;
      this.client.postRequestSendForm(`${this.BASE_API}/registroprog`, {
        nombre: this.form.value.nombre,
        correo: this.form.value.email,
        celular: this.form.value.celular,
        password: this.form.value.password,
        portafolio: this.form.value.portafolio,
        rango: this.form.value.rango,
        especialidad: this.form.value.especialidad,
        descripcion: this.form.value.descripcion
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
