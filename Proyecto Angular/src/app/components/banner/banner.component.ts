import { Component, OnInit, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FrontService } from '../../servicios/front.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../servicios/client.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit{

  @ViewChild('punto') punto: ElementRef;
  @ViewChildren('editInputs') editInputs: QueryList<ElementRef>;
  @ViewChild('editTextarea') editTextarea: ElementRef;

  form: FormGroup;
  id:any;
  editar:boolean = false;
  data:any[] = [];
  BASE_API: string = environment.BASE_API;
  changeButton: boolean = true;
  edit:any;
  archivos: any = [];
  nombrePortada: string;
  nombrePerfil: string;

  containerFile:any;
  
  constructor(
    public client: ClientService,
    private route: Router,
    public front: FrontService,
    private fb: FormBuilder,
    private Renderer: Renderer2
    ) { }
    
    ngOnInit(): void {
      this.form = new FormGroup({});

      let tokenId = localStorage.getItem('id');
      let signUp = tokenId.split(',')[0];
      this.id = tokenId.split(',')[1];
      
      if(signUp == 'S'){
        this.changeButton = false;
      }else{
        this.changeButton = true;
      }


      this.client.getRequestAllProducts(`${this.BASE_API}/traerprog?id=${this.id}`).subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          // console.log(response);
          this.data = response;   
          
          this.form = this.fb.group({
            img: [null],
            descripcion: [this.data[0].descripcion, Validators.required],
            rango: [this.data[0].rango, Validators.required],
            especialidad: [this.data[0].especialidad, Validators.required],
            correo: [this.data[0].correo, Validators.required],
            repositorio: [this.data[0].urlprog, Validators.required],
          });
        },
        //si ocurre un error en el proceso de envío del formulario...
        (error) => {
          //se imprime el status del error
          console.log(error.status);
          // this.route.navigate( ['/']);
        }
      )   
    }
    
    
  editarPerfil(){
    this.editar = true;
    this.Renderer.setStyle(this.editTextarea.nativeElement, 'border', '1px solid #000');
    this.Renderer.removeAttribute(this.editTextarea.nativeElement, 'readonly');
    
    this.editInputs.forEach(e => {
      this.Renderer.setStyle(e.nativeElement, 'border-bottom', '1.5px solid #000');
      this.Renderer.removeAttribute(e.nativeElement, 'readonly');
    });
  }

  subirFoto(event, nombre){
    const archivosCapturados = event.target.files[0];
    if(nombre == 'portada'){
      this.nombrePortada = `portada,${archivosCapturados.name},${this.id},P`;
    }else{
      this.nombrePerfil = `perfil,${archivosCapturados.name},${this.id},P`;
    }

    this.archivos.push(archivosCapturados);
      
  }

  onSubmit(){
    this.salirEdicion()
    
    try {
      const fd = new FormData();

      this.archivos.forEach((e:any) => {
        if(e.name == this.nombrePortada.split(',')[1]){
          fd.append('files',e,this.nombrePortada);
          
        }else if(e.name == this.nombrePerfil.split(',')[1]){
          fd.append('files',e,this.nombrePerfil);
        }        
      });

      this.client.postRequestSendForm(`${this.BASE_API}/subirimagen`, fd).subscribe(res => {
        console.log('respuesta:', res);
      })      
      this.archivos.length = 0;
      
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }

  salirEdicion(){
    this.editar = false;
    this.Renderer.setStyle(this.editTextarea.nativeElement, 'border', 'none');
    this.Renderer.setAttribute(this.editTextarea.nativeElement, 'readonly', 'true');      


    this.editInputs.forEach(e=> {
      this.Renderer.setStyle(e.nativeElement, 'border-bottom', '1.5px solid #707070');
      this.Renderer.setAttribute(e.nativeElement, 'readonly', 'true');      
    });

  }
  
  


  hacerPago(){
    this.client.getRequestAllProducts(`${this.BASE_API}/verificartoken`).subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        console.log(response);
        this.route.navigate( ['/pagos']);

    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      //se imprime el status del error
      console.log(error.status);
      // this.route.navigate( ['/']);
      }
    )
  }

  hacerPropuesta(){
    this.client.getRequestAllProducts(`${this.BASE_API}/verificartoken`).subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        console.log(response);
        this.route.navigate( ['/proyecto']);
  
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      //se imprime el status del error
      console.log(error.status);
      }
    )
  }
}