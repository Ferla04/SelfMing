import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let header = document.getElementById('header');
    let header2 = document.getElementById('header2');

    let token = localStorage.getItem('token');
    if(!token){
      header2.style.display = 'none';
      header.style.display = 'block';
      
    }else{
      header2.style.display = 'block';
      header.style.display = 'none';
    }
  }
}



