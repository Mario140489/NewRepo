import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-messagens',
  templateUrl: './messagens.component.html',
  styleUrls: ['./messagens.component.css']
})
export class MessagensComponent implements OnInit {

  msg:string ="teste"

  layput:string =`<div id="liveToast" class="toast #tipoalerta#" style="opacity: 0.9; color: white;" >
  <div class="toast-header">
    <strong class="mr-auto">SYS</strong>
    <button   type="button"  id="teste" class="ml-2 mb-1">
    </button>
  </div>
  <div class="toast-body">
    #msg#
  </div>
</div>`
  constructor() { }

  ngOnInit() {

    // $("#msg").append(this.layput);
     //document.getElementById("teste").click();
     this.layput = this.layput.replace("#tipoalerta#","bg-danger")
     this.layput = this.layput.replace('#msg#', this.msg);
     document.getElementById('msg').innerHTML= this.layput;
     document.getElementById('teste').onclick = this.close
  }

  close(){
    document.getElementById('liveToast').remove();
  }

}
