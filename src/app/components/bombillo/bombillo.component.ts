import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bombillo',
  templateUrl: './bombillo.component.html',
  styleUrls: ['./bombillo.component.css']
})
export class BombilloComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {

    let inicio:any = document.querySelectorAll('.inicio');

    for(let i = 0; i < inicio.length; i++){
        inicio[i].addEventListener('click',()=>{
          this.route.navigate( ['/inicio']);
        })
    }
  }

}
