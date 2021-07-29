import { uteis } from './../Utils/uteis';
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
  conta = {
    contapai:null,
    chaveconta:null,
    descconta:"",
    tipoconta:""
  };
  desccontapai:string="";
  ultimodigito=".";
  maskactive:any="";
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

  }

  VerificadorTipeMask(){

  }

  CriaMarcaraExemplo(){

  }

  buscakey(parans:any){
    let key:any =[]
   for(let i =0 ; i<(parans.length -1);i++){
    key.push(parans[i]);
   }
   key = key.toString();
   key = key.replaceAll(",",".");
   return key;
  }

  GetFather(args:any){
   this.conta.tipoconta= "";
   this.conta.contapai = "";
   this.utei.HtmlElementbyId('desccontapai').value = "";
   let parans = args.split('.');
   parans = this.buscakey(parans);
   this.arraycontas.forEach(result =>{
     if(parans == result['chaveconta']){
       this.conta.contapai = result['chaveconta']
       this.utei.HtmlElementbyId('desccontapai').value = result['descconta'];
     }
   })
   let teste = this.Jsonmask['datamask'];
   this.conta.tipoconta = this.maskactive == args.length? "Analitico":"Sintetico";
  }

  verificatipodeconta(parans){
    if(this.arraycontas.length > 0){
     return true;
    }
    else{
      let key = parans.indexOf('.')
      if(key == -1){
       return true;
      }
      this.msg.show("É preciso criar uma conta Pai antes!",{classe:"bg-danger"});
      return false;
    }
  }

  apenasnumeros(e){
    let data =  this.conta.chaveconta
    data = this.utei.AceitarApenasNumeros(data);
    data = this.utei.Mask(data,this.array[this.array.length -1].digitos)
    this.conta.chaveconta = data
    this.GetFather(data);
   }

  onKey(e){
     let keydigito:any = (<HTMLSelectElement>document.getElementById('digitokey')).value;
     let teste = keydigito[keydigito.length -1]
     if(teste != "0" && teste !="." || e.key == this.ultimodigito && this.ultimodigito == "."){
     keydigito=keydigito.substr(0,(keydigito.length - 1));
     }
     this.ultimodigito=e.key;
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
    let digitos = this.array[this.array.length -1].digitos
    this.maskactive = digitos.length;
  }

  Contador(parans){
    let contador:number = 0;
    for(let i = 0 ; i<parans.length ;i++){
       if(parans[i] =="."){
         contador = contador + 1;
       }
    }
    return contador;
  }

  DeleteConta(e){
    let id = e.currentTarget.id;
   if(e.currentTarget.name){

   }
   else{
    this.RemoveConta(id);
   }

  }

  RemoveConta(parans){
    for(let i = 0; i< this.arraycontas.length; i++){
      if(parans == this.arraycontas[i].chaveconta){
        this.arraycontas.splice(i,1)
      }
    }
  }

  OpenModal(e){
    let id = e.currentTarget.id;
    if(this.array.length > 0){
      this.AddMaskModal(id);
      id > 0? this.conta.contapai = id:"";
      (<any>$("#exampleModal")).modal("toggle");
    }
    else{
      this.msg.show("É preciso criar os niveis de mascaras",{classe:"bg-danger"});
    }
  }

  VerificaContaInclusa(parans){
   let result = false;
   this.arraycontas.forEach((valor,i)=>{
    if(valor.chaveconta == parans.chaveconta){
      result = true;
      this.msg.show("Conta com essa chave já inclusa! tente outra numeração para essa chave",{classe:"bg-danger"});
    }
   });
   return result;
  }

  validadorconta(){
    let mask = this.array[0].length;
    if(mask < this.conta.chaveconta && !this.conta.contapai){
      this.msg.show("Necessario cadastrar conta pai!",{classe:"bg-danger"})
      return  false;
    }
    return true
  }

  AddContas(f:NgForm){

    if(this.conta.chaveconta != "0" && this.conta.descconta &&
     this.verificatipodeconta(this.conta.chaveconta) &&
     this.validadorconta())
    {
    let DataJson = {
      contapai:this.conta.contapai,
      chaveconta:this.conta.chaveconta,
      descconta:this.conta.descconta,
      tipoconta:this.conta.tipoconta
    };
    if(!this.VerificaContaInclusa(DataJson)){
      this.arraycontas.push(DataJson);
      this.arraycontas.sort((x,y)=>{
        let teste = x.chaveconta == y.chaveconta? 0: x.chaveconta > y.chaveconta ?1:-1;
       return teste;
      });
      this.utei.HtmlElementbyId("btn-sairmodal").click();
      this.utei.JsonClear(this.conta);
    }
    }else{
      if(this.conta.chaveconta ==0){
        this.msg.show("Campo chave tem ser maior que 0.",{classe:"bg-danger"})
      }
      if(this.conta.descconta == ""){
        this.msg.show("Campo decrição não pode ser vazio.",{classe:"bg-danger"})
      }
    }
  }

  RedefinicaoMask(){
    let result:boolean = true;
    if(this.arraycontas.length > 0){
      result = window.confirm("Deseja relamente restar as mascaras");
    }
    return result;
  }

  AddMack(){
   let keydigito = (<HTMLSelectElement>document.getElementById('digitokey')).value;
   if(keydigito && this.RedefinicaoMask()){
    this.ultimodigito ="."
    if(keydigito[keydigito.length -1]==".")
    {
      keydigito=keydigito.substr(0,(keydigito.length - 1));
    }
    this.array=[];
    this.arraycontas= [];
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
