import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UteisService {

constructor() { }

  FormataInactive(data){

    data = data == 'N' || data == 0? 'Não' : data = data == 'Y' || data== 1 ? 'Sim': data;
    return data;

  }

  FormataTableInactive(data){
    debugger;
    if(data && data.length > 0){

      for(let i = 0; i < data.length; i++){

        data[i]['do_inactive'] = this.FormataInactive(data[i]['do_inactive']);

      }

    }

    return data;

  }


}