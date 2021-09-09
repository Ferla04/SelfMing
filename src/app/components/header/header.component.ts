import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    let registro:any = document.getElementById('registro');
    let login:any = document.getElementById('login');
    let ventana = document.getElementById('contModal');
    let cerrar = document.getElementById('close');
    let registroU = document.getElementById('registroU');
    let registroF = document.getElementById('registroF');
    
    registro.addEventListener('click',()=>{
      ventana.style.display = 'flex';
    })

    cerrar.addEventListener('click', ()=>{
      ventana.style.display = 'none';
    })

    login.addEventListener('click',()=>{
      this.route.navigate( ['/login']);
    })

    registroU.addEventListener('click',()=>{
      this.route.navigate( ['/registro']);
    })

    registroF.addEventListener('click',()=>{
      this.route.navigate( ['/registro2']);
    })

  }
 
}
