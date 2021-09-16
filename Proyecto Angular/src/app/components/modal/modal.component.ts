import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {

    let registroU = document.getElementById('registroU');
    let registroF = document.getElementById('registroF');

    registroU.addEventListener('click',()=>{
      this.route.navigate( ['/registro']);
    })

    registroF.addEventListener('click',()=>{
      this.route.navigate( ['/registro2']);
    })
  }

}
