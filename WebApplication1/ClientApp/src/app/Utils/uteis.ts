import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class uteis{
  transformareais(vl){
    let valor = vl;
    valor = valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
    return valor
  }
  tranformaativo(vl){
   if (vl === "s"|| vl ==="S"){
       vl = 'Sim';
   }else
   if (vl === "n"|| vl ==="N"){
       vl = 'Não'
   }
   else{
       vl="";
   }
   return vl
  }
  AtualizaVariavel(data){
    return data;
  }
}
