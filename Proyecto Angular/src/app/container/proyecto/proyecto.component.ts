import { Component, OnInit } from '@angular/core';
import { FrontService } from '../../servicios/front.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  form: FormGroup;
  progamador: string = '';

  constructor(
    public front: FrontService,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    let inputs:any = document.querySelectorAll('.inputs');
    let label:any = document.querySelectorAll('.label');

    //servicios
    this.front.ojo(inputs,label); 

    //Input no cambiable
    this.progamador = 'fernanda'

    this.form = this.fb.group({
      programador: ['', Validators.required],
    });
  }

}
