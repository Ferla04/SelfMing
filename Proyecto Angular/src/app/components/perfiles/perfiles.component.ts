import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  BASE_API: string = environment.BASE_API;
  card:any[] = [];

  constructor() { }

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

    } catch (error) {
      console.log(error);
    }
  }


}
