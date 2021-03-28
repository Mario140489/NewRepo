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

  Incluirbtn(data){
    if(data && data.length >0){
      for(let i=0; i< data.length;i++){
        data[i]['btn'] = `<button class="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Editar"><i class="fas fa-user-edit"></i></button>`
      }
    }
    return data;
  }

}
