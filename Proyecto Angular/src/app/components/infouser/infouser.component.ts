import { Component, OnInit, Renderer2, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FrontService } from '../../servicios/front.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../servicios/client.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infouser',
  templateUrl: './infouser.component.html',
  styleUrls: ['./infouser.component.css']
})
export class InfouserComponent implements OnInit {

  @ViewChildren('editInputs') editInputs: QueryList<ElementRef>;

  form: FormGroup;
  data:any[] = [];
  editar:boolean = false;
  BASE_API: string = environment.BASE_API;
  id:string;
  photoSelectedPerfil:any; 
  archivos:any[] = [];
  nombrePerfil:any;
  nuevoPerfil:string;

  constructor(
    public client: ClientService,
    private route: Router,
    public front: FrontService,
    private fb: FormBuilder,
    private Renderer: Renderer2
  ) {}
    

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl(),
      correo: new FormControl(),
      celular: new FormControl()
    });

    this.id = localStorage.getItem('iduser');

    this.client.getRequestAllProducts(`${this.BASE_API}/traeruser?id=${this.id}`).subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {

        this.data = response; 
        console.log(this.data);
        
        if(this.data[0].perfil == 'N') {
          this.photoSelectedPerfil = '../../../assets/perfil.jpg';
          this.nuevoPerfil = 'N';
        }else{
          this.photoSelectedPerfil = `${this.BASE_API}/downloadimage?imagen=${this.data[0].perfil}`;
          this.nuevoPerfil = this.photoSelectedPerfil.split('=')[1].split('/')[3];

        }

        this.form = this.fb.group({
          img: [null],
          correo: [this.data[0].correo, Validators.required],
          nombre: [this.data[0].nomcompleto, Validators.required],
          celular: [this.data[0].celular, Validators.required],
        });
      },
      (error) => {
        console.log(error.status);
      })
  }

  
  editarPerfil(){
    this.editar = true;
    
    this.editInputs.forEach(e => {
      this.Renderer.setStyle(e.nativeElement, 'border-bottom', '2px solid #000');
      this.Renderer.removeAttribute(e.nativeElement, 'readonly');
    });
  }

  salirEdicion(){
    this.editar = false;
    
    this.editInputs.forEach(e=> {
      this.Renderer.setStyle(e.nativeElement, 'border-bottom', '2px solid #707070');
      this.Renderer.setAttribute(e.nativeElement, 'readonly', 'true');      
    });

  }

  subirFoto(event){
    if(event.target.files && event.target.files[0]){
      
      const archivosCapturados = event.target.files[0];
      const reader = new FileReader();
      
      if(archivosCapturados){
        this.nombrePerfil = archivosCapturados;
        reader.onload = e => this.photoSelectedPerfil = reader.result;
        reader.readAsDataURL(archivosCapturados);
      }
    }
    
  }

  onSubmit(){
    this.salirEdicion();

    try {
      const fd = new FormData();

      if(this.nombrePerfil){
        console.log(this.nombrePerfil);
        this.nuevoPerfil = `perfil,${this.id},U`;

        fd.append('files',this.nombrePerfil,this.nuevoPerfil);

        this.client.postRequestSendForm(`${this.BASE_API}/subirimagen`, fd).subscribe(res => {
          console.log('respuesta:', res);
        },
        (error) => {
          console.log(error.status);
        }) 
      }      
    
      if(this.nuevoPerfil !== 'N') this.nuevoPerfil = `./images/perfiluser/${this.nuevoPerfil}`
      
      this.client.putRequestSendForm(`${this.BASE_API}/actualizaruser`, {
        id: this.id,
        nombre: this.form.value.nombre,
        correo: this.form.value.correo,
        celular: this.form.value.celular,
        perfil: this.nuevoPerfil,
      }).subscribe(res => {
        window.location.reload();
        console.log('respuesta:', res);
        this.archivos.length = 0;
      },
      (error) => {
        console.log(error.status);
      })

      
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }

}
