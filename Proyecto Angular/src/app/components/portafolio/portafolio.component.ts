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

  form: FormGroup;
  id:any;
  changeButton:boolean;
  imagenes:any[] = [];
  portafolios:any[] = [];
  mensaje:string = 'Seleccione 4 Imagenes';

  constructor(
    public client: ClientService,
    private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    let tokenId = localStorage.getItem('id');
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

  }

  CrearPortafolio(){

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

    this.imagenes = event.target.files;
    console.log(this.imagenes);
    
    
  }

  onSubmit(){
    if(this.imagenes.length > 0){
      const fd = new FormData();
      let nombreImagen:string;
      for(const i in this.imagenes){

        nombreImagen = `portafolio,${i},${this.id}`;
        fd.append('files',this.imagenes[i],nombreImagen);

      }  

    }
  }

}
