
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { observable, Observable } from 'rxjs';
import {ToastServiceService} from '../services/toast-service.service';



@Component({
  selector: 'app-messagens',
  templateUrl: './messagens.component.html',
  styleUrls: ['./messagens.component.css']
})
export class MessagensComponent implements OnInit {

  @Input() toast:any[]=[];
  msg="oi";

  layput: string = `<div id="liveToast" class="toast #tipoalerta#" style="opacity: 0.9; color: white;" >
  <div class="toast-header">
    <strong class="mr-auto">SYS</strong>
    <button   type="button"  id="teste" class="ml-2 mb-1">
    </button>
  </div>
  <div class="toast-body">
    #msg#
  </div>
</div>`
  constructor(private toastservice:ToastServiceService) { }


  ngOnInit() {
     this.novoObservable().subscribe(result =>{
       alert(result)
     })
    // $("#msg").append(this.layput);
    //document.getElementById("teste").click();
    this.layput = this.layput.replace("#tipoalerta#", "bg-danger")
    this.layput = this.layput.replace('#msg#', this.msg);
    document.getElementById('msg').innerHTML = this.layput;
    document.getElementById('teste').onclick = this.close
  }

  novoObservable(): Observable<any> {

    return new Observable<any>((observador:any) => {
       observador = this.toastservice.toasts;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger;
    for (let propName in changes) {
      /*let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`propName: currentValue = cur, previousValue = prev`);*/
    }
  }
  close() {
    document.getElementById('liveToast').remove();
  }

}
