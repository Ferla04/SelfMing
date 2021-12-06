import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfilprog',
  templateUrl: './perfilprog.component.html',
  styleUrls: ['./perfilprog.component.css']
})
export class PerfilprogComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

}
