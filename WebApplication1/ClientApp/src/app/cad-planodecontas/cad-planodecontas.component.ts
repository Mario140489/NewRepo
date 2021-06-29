import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Mask } from '../Classes/mask';
import { ToastServiceService } from '../services/toast-service.service';
import { UteisService } from '../services/uteis.service';

@Component({
  selector: 'app-cad-planodecontas',
  templateUrl: './cad-planodecontas.component.html',
  styleUrls: ['./cad-planodecontas.component.scss']
})

export class CadPlanodecontasComponent implements OnInit {
  public mask = new Mask();
  maskactive:any=0;
  loader:boolean=false;
  Jsonmask={datamask:[]};
  errorkey:boolean = false;
  array= [];
  niveis:any = [1];
  exemplomask;
  createForm :FormGroup;
  arraycontas = [];
  tipoconta:string=""
  constructor(private msg:ToastServiceService,private utei:UteisService) { }

  ngOnInit() {
   this.mask.nv = this.Jsonmask.datamask.length + 1;

  }

  onSubmit(parans:NgForm){
    debugger
  }

  VerificadorTipeMask(){

  }

  CriaMarcaraExemplo(){

  }
  apenasnumeros(e){
    let id = e.target.id
    let data =  this.utei.HtmlElementbyId(id);
    data.value = this.utei.AceitarApenasNumeros(data.value);
   }

  onKey(){
    debugger;
     let keydigito:any = (<HTMLSelectElement>document.getElementById('digitokey')).value;
     let teste = keydigito[keydigito.length -1]
     if(teste != "0" && teste !="."){
     keydigito=keydigito.substr(0,(keydigito.length - 1));

     }
     (<HTMLSelectElement>document.getElementById('digitokey')).value= keydigito
  }
  CriaEstrutura(){
    let jsondata:any ={}
      let key = this.array[0].digitos;
      key = parseInt(key) +1;
     jsondata["contas"]={
       nv:this.array[0].nv,
       descricao:"",
       key:key
     };
     this.arraycontas.push(jsondata);

  }

  AddMaskModal(parans){
   let idx = parans - 1;
   this.maskactive = this.array[idx].length;
   this.tipoconta = parans < this.array.length?"Sintetico":"Analitico"
   this.utei.HtmlElementbyId("tipoconta").value = this.tipoconta;
  }

  teste(){
    alert("asda");
  }

  OpenModal(e){
    let id = e.currentTarget.id;
    if(this.array.length > 0){
      this.AddMaskModal(id);
      (<any>$("#exampleModal")).modal("toggle");
    }
    else{
      this.msg.show("É preciso criar os niveis de mascaras",{classe:"bg-danger"});
    }
  }

  AddContas(f){
    debugger;
    console.log(f);
  }

  AddMack(){
    this.array=[];
   let keydigito = (<HTMLSelectElement>document.getElementById('digitokey')).value;
   if(keydigito){
    let niveis = keydigito.split('.');
    this.errorkey = false;

    niveis.forEach((valor,i)=>{
      let JsonData = {
        nv: this.array.length +1,
        digitos: (this.array.length != 0? this.array[this.array.length -1].digitos +"." :"")   +valor,
        length: valor.length
       }
       this.array.push(JsonData);
    });

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
  (<HTMLSelectElement>document.getElementById('digitokey')).value = "";
  }

  AddConta(){
    if(this.array.length ==0){
      this.msg.show("É preciso criar os niveis de mascaras",{classe:"bg-danger"});
    }

  }

}
