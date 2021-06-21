import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Mask } from '../Classes/mask';
import { ToastServiceService } from '../services/toast-service.service';

@Component({
  selector: 'app-cad-planodecontas',
  templateUrl: './cad-planodecontas.component.html',
  styleUrls: ['./cad-planodecontas.component.scss']
})

export class CadPlanodecontasComponent implements OnInit {
  public mask = new Mask();
  loader:boolean=false;
  Jsonmask={datamask:[]};
  errorkey:boolean = false;
  array= [];
  niveis:any = [1];
  exemplomask;
  createForm :FormGroup;
  constructor(private msg:ToastServiceService,) { }

  ngOnInit() {
   this.mask.nv = this.Jsonmask.datamask.length + 1
  }

  onSubmit(parans:NgForm){
    debugger
  }

  VerificadorTipeMask(){

  }

  CriaMarcaraExemplo(){

  }
  onKey(){
    debugger;
     let keydigito:any = (<HTMLSelectElement>document.getElementById('digitokey')).value;
     let teste = keydigito[keydigito.length -1]
     if(teste != "0"){


     keydigito=keydigito.substr(0,(keydigito.length - 1));

     }
     (<HTMLSelectElement>document.getElementById('digitokey')).value= keydigito
  }

  AddMack(){
   let keydigito = (<HTMLSelectElement>document.getElementById('digitokey')).value;
   if(keydigito){
    (<HTMLSelectElement>document.getElementById('digitokey')).value = keydigito +'.'
    this.errorkey = false;
   let JsonData = {
    nv: this.array.length +1,
    digitos: keydigito,
   }
   this.array.push(JsonData);
   if(this.array.length){
     for(let i =0 ;i< this.array.length;i++){
        if((this.array.length) == this.array[i].nv){
           this.array[i].type = "Analitico"
        }else{
          this.array[i].type = "Sintetico"
        }
     }
   }
   //this.mask.nv = this.Jsonmask.mask.length + 1
  }else{
    this.errorkey = true;
  }
  }

  AddConta(){
    if(this.array.length ==0){
      this.msg.show("É preciso criar os niveis de mascaras",{classe:"bg-danger"});
    }

  }

}
