import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../servicios/client.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {
  tarjetas:any;
  BASE_API: string = environment.BASE_API;
  card:any[] = [];

  constructor(
    public client: ClientService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAdmins();   
  }

  
  async getAdmins(){
    try {
      const resPieces = await fetch(`${this.BASE_API}/inicio`,{
        method: 'GET',
        headers: { "Content-type": "application/json" }
      })
      const data = await resPieces.json(); 
      this.card = data;
      console.log(this.card);

      // if(this.data[0].portada == 'N'){
      //   this.nombrePortada = '../../../assets/portada.jpg';
      // }else{
      //   this.nombrePortada =`${this.BASE_API}/downloadimage?imagen=${this.data[0].portada}`;
      // }
      

      setTimeout((e)=>{
        let banner = document.querySelectorAll('.banner');
        let perfil = document.querySelectorAll('.perfil');
    
        console.log(banner);
        this.card.forEach((e,i) =>{
          if(e.portada == 'N'){
            banner[i].setAttribute('src','../../../assets/portada.jpg')
          }else{
            banner[i].setAttribute('src',`${this.BASE_API}/downloadimage?imagen=${e.portada}`)
          }

          if(e.perfil == 'N'){
            perfil[i].setAttribute('src','../../../assets/perfil.jpg')
          }else{
            perfil[i].setAttribute('src',`${this.BASE_API}/downloadimage?imagen=${e.perfil}`)
          }
        
        })
      },50)
      
    } catch (error) {
      console.log(error);
    }


  }


  verPerfil(idprog){
    this.client.getRequestAllProducts(`${this.BASE_API}/verificartoken`).subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        localStorage.setItem('idprog', `S,${idprog}`);
        this.route.navigate( ['/perfilProg']);
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      //se imprime el status del error
      console.log(error.status);
      // this.route.navigate( ['/']);
      }
    )
  }
  
}
