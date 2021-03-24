import { Injectable } from '@angular/core';
import { MessagensComponent } from '../messagens/messagens.component';

var mes = new MessagensComponent();

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor() { }
  toasts: any[] = [];

  show(data,option) {
    mes.show(data,option)
   //this.msg.show(data,option);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
