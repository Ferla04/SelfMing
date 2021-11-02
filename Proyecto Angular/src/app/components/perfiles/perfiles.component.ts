import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {
  card:any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.getAdmins();

  }


  async getAdmins(){
    try {
      const resPieces = await fetch('http://localhost:10103/inicio',{
        method: 'GET',
        headers: { "Content-type": "application/json" }
      })
      const data = await resPieces.json(); 
      this.card = data
      console.log(this.card);
      
      // this.movies.forEach(e => {
      //   e.status = true;
      //   e.buttonM = 'Ocultar';
      // });
    } catch (error) {
      console.log(error);
    }
  }


}
