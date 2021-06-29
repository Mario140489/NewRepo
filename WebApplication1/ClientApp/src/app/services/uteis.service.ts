import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UteisService {

constructor() { }

  FormataInactive(data){

    data = data == 'N' || data == 0? 'Ativo' : data = data == 'Y' || data== 1 ? 'Inativo': data;
    return data;

  }

  HtmlElementbyId(data){
   return (<HTMLSelectElement>document.getElementById(data));
  }

  AceitarApenasNumeros(data){

      return data = data.replace(/\D/g,"");

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
  load():void{
    let element = document.body;
    $('body').append(`<div class="load">
    <div class="loadload">
  <div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-danger" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-warning" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-info" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-light" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-dark" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>
    </div>`);
  }

  removeload(){
    $('.load').remove();
  }

}
