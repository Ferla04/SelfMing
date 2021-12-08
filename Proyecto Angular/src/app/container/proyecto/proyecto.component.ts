import { Component, OnInit } from '@angular/core';
import { FrontService } from '../../servicios/front.service';
import { ClientService } from '../../servicios/client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  BASE_API: string = environment.BASE_API;
  form: FormGroup;
  idProg: string ;
  idUser: string;
  emailUser:string;
  emailProg:string;
  statusFile: string = 'Adjuntar';
  archivosCapturados:any;

  constructor(
    public client: ClientService,
    public front: FrontService,
    private fb: FormBuilder,
    private route: Router
    ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      archivo: new FormControl(),
      nombre: new FormControl(),
      prog: new FormControl(),
      user: new FormControl(),
      fecha: new FormControl(),
      descripcion: new FormControl(),
    });

    let tokenId = localStorage.getItem('idprog');
    this.idProg = tokenId.split(',')[1];

    this.client.getRequestAllProducts(`${this.BASE_API}/verificartoken`).subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        this.idUser = response.id
        this.emailUser = response.correo;
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      //se imprime el status del error
      console.log(error.status);
      // this.route.navigate( ['/']);
      }
    )


    this.client.getRequestAllProducts(`${this.BASE_API}/traerprog?id=${this.idProg}`).subscribe(
      (response: any) => {
        this.emailProg = response[0].correo;
      },
      (error) => {

        console.log(error.status);

      }
    )  

    setTimeout(()=>{
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        prog: [this.emailProg, Validators.required],
        user: [this.emailUser, Validators.required],
        fecha: ['', Validators.required],
        descripcion: ['', Validators.required],
        archivo: [null, Validators.required],
      });
    },250)

  }

  adjuntarArchivo(event):void{
    if(event.target.files && event.target.files[0]){
      let typeFile = event.target.files[0].type.split('/')[1];
      if(typeFile == 'pdf'){
        this.statusFile = 'Archivo adjuntado';
        this.archivosCapturados = event.target.files[0];
        console.log(this.archivosCapturados);
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Solo archivos pdf',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  }

  onSubmit():void{
    if (this.form.valid){
      let nomProyecto = `${this.idUser},${this.idProg},${this.form.value.nombre}.pdf`;
      console.log(nomProyecto);

      const fd = new FormData();
      fd.append('files',this.archivosCapturados, nomProyecto);
      this.client.postRequestSendForm(`${this.BASE_API}/adjuntarArchivo`, fd).subscribe(res => {
        console.log('respuesta:', res);
      })  

      this.client.postRequestSendForm(`${this.BASE_API}/proyecto`, {
        nombre: this.form.value.nombre,
        prog: Number(this.idProg),
        user: this.idUser,
        fecha: this.form.value.fecha,
        descripcion: this.form.value.descripcion,
        archivo: nomProyecto
      }).subscribe(
        (response: any) => {
          return this.route.navigate( ['/perfilProg']);
        },

        (error) => {
          console.log(error.status);
          console.log(error.error.errors);
        })
      
    }else{
      console.log('Form error')
    }
  }

}
