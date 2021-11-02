import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { FrontService } from '../../servicios/front.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({ 
  selector: 'app-registro2',
  templateUrl: './registro2.component.html',
  styleUrls: ['./registro2.component.css']
})

export class Registro2Component implements OnInit {
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
    this.front.ojo(inputs,label,ver,4); 

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
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
      this.client.postRequestSendForm('http://localhost:10103/registroprog', {
        nombre: this.form.value.nombre,
        usuario: this.form.value.usuario,
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
          this.route.navigate( ['/login']);

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
