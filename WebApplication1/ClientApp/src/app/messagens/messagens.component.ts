import {
  Component,
  Input,
  OnInit,
  SimpleChanges
} from '@angular/core';



@Component({
  selector: 'app-messagens',
  templateUrl: './messagens.component.html',
  styleUrls: ['./messagens.component.css']
})
export class MessagensComponent implements OnInit {

  toast = [];
  time: number = 5000;
  msg: string = "";
  classe: string = "bg-secondary"

  layput: string = `<div id="#id#" class="toast   #tipoalerta#" style="opacity: 0.9; color: white;" >
  <div class="toast-header">
    <strong class="mr-auto">SYS</strong>
    <button   type="button"  id="#btn-close#" class="btn ml-2 mb-1 close">
    &times;
    </button>
  </div>
  <div class="toast-body">
    #msg#
  </div>
</div>`
  constructor() {}


  ngOnInit() {

    // $("#msg").append(this.layput);
    //document.getElementById("teste").click();
    //this.layput = this.layput.replace("#tipoalerta#", this.class)
    //this.layput = this.layput.replace('#msg#', this.msg);
   // document.getElementById('msg').innerHTML = this.layput;
   // document.getElementById('btn-close').onclick = this.close
  }




 private  mountmessage() {

    let messagem = this.layput;


    messagem = messagem.replace('#msg#', this.msg);

    messagem = messagem.replace("#tipoalerta#", this.classe)
    let idfinal;
    for (let i = 0; i < 10; i++) {
      let id: string = Math.random().toString(36).substr(2, 5);
      if (this.toast.indexOf(id) === -1) {
        i = 10;
        idfinal = id;
        messagem = messagem.replace('#id#', id);
        messagem = messagem.replace("#btn-close#",id);
        this.toast.push(id);
      }

    }
    let data = {
      id : idfinal,
      messagem : messagem
    };
    return data;

  }

  resetglobal(){
    this.time = 5000;
    this.msg = "";
    this.classe = "bg-secondary"
  }

  show(msg,option) {

    this.classe = option.classe ? option.classe : this.classe;
    this.msg = msg ? msg : this.msg;
    this.time = option.time ? option.time : this.time;

    let messagemdata:any = this.mountmessage();

    document.getElementById('msg').innerHTML = messagemdata.messagem;
    document.getElementById(messagemdata.id).onclick = this.close;

    let id = messagemdata.id;
    setTimeout( () => {document.getElementById(id).remove();} , this.time)
    this.resetglobal();
  }

  close(this) {
    let id = this.id;
    document.getElementById(id).remove();
  }

}
