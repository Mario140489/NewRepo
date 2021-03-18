import { Injectable } from '@angular/core';
import { MessagensComponent } from '../messagens/messagens.component';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private msg:MessagensComponent) { }
  toasts: any[] = [];

  show(data) {
    this.msg.toast.push(data)
    //this.toasts.push(data);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
