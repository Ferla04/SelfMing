import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../servicios/client.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {

  BASE_API: string = environment.BASE_API;
  form: FormGroup;
  id:any;
  changeButton:boolean;
  imagenes:any[] = [];
  mensaje:string = 'Seleccione 4 Imagenes';
  modal: boolean = false;
  showButton:boolean = true;
  showMessage:boolean = true;

  portafolios:any[] = [];

  constructor(
    public client: ClientService,
    private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    let tokenId = localStorage.getItem('idprog');
    let signUp = tokenId.split(',')[0];
    this.id = tokenId.split(',')[1];
    
    if(signUp == 'S'){
      this.changeButton = false;
    }else{
      this.changeButton = true;
    }

    this.form = this.fb.group({
      img: [null],
      nombre: ['', Validators.required],
      url: ['', Validators.required],
    });

    this.client.getRequestAllProducts(`${this.BASE_API}/traerporta?id=${this.id}`).subscribe(
      (response: any) => {
        console.log(response);

        if(response.length > 0){
          this.portafolios = response[0];
          for(let i = 0; i < this.portafolios.length; i++){
            this.portafolios[i]['imgsPort'] = response[i+1];
          }
        }
        console.log(this.portafolios)

        if(response[0].length >= 2){
          this.showButton = false;
        }else{
          this.showButton = true;
        }

        if(response[0].length > 0){
          this.showMessage = false
        }else{
          this.showMessage = true
        }
      },
      (error) => {
        console.log(error.status);
      })
  }

  CrearPortafolio(){
    this.modal= true;
  }

  subirFoto(event:any){
    let cantidad = event.target.files.length;
    if(cantidad > 0){
      this.mensaje = `${cantidad} Archivos`
    }
    if(cantidad > 4){
      alert('Tienes que seleccionar 4 archivos'); 
      this.mensaje = `Seleccione 4 Imagenes`;
      event.target.files.length = 0
      cantidad = 0;
      return;
    }

    for (const i of event.target.files) {
      this.imagenes.push(i);
    }
    
  }

  onSubmit(){
    this.modal = false;

    if (this.form.valid) {
      this.client.postRequestSendForm(`${this.BASE_API}/nuevoportafolio`, {
        id: this.id,
        nombre: this.form.value.nombre,
        url: this.form.value.url
      }).subscribe(
        (response: any) => {

          if(this.imagenes.length > 0){
            const fd = new FormData();
            let nombreImagen:string;

            for(const i in this.imagenes){
              nombreImagen = `portafolio,${i},${this.id},${response.idportafolio}`;
              fd.append('files',this.imagenes[i],nombreImagen);
            }  

            this.client.postRequestSendForm(`${this.BASE_API}/imagenesportafolio?idportafolio=${response.idportafolio}`, fd).subscribe(res => {
              console.log('respuesta:', res);
              window.location.reload();
            }) 
          }

      },
      (error) => {
        console.log(error.status);
        console.log(error.error.errors);
      })
    }

  }

}
