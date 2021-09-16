import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrontService {

  constructor() { }

  ojo(number: number,inputs:any,label:any,ver:any){
    for(let i = 0; i < inputs.length; i++){
        inputs[i].addEventListener('keyup',()=>{
            if(inputs[i].value.length > 0){
                label[i].classList.add('transInput');
                if(i == number){
                    if(inputs[i].type == 'text'){
                        ver.style.display = 'block';
                        ver.classList = 'fas fa-eye-slash';
                    }else{
                        ver.style.display = 'block';
                    }
                }
            }else{
                label[i].classList.remove('transInput');
                ver.style.display = 'none';
            }
            
        })
    }
  }

  mostrarpass2(tipo:any,ver:any){
    if(tipo.type == 'password'){
        ver.classList = 'fas fa-eye-slash';
        tipo.type = 'text';
    }else{
        ver.classList = 'fas fa-eye';
        tipo.type = 'password';
    }
  }


}
