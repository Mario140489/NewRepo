import { Component, EventEmitter, OnInit } from '@angular/core';
import { Usuario } from '../Classes/Usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { ToastServiceService } from '../services/toast-service.service';

@Component({
  selector: 'app-primeiroacesso',
  templateUrl: './primeiroacesso.component.html',
  styleUrls: ['./primeiroacesso.component.css']
})
export class PrimeiroacessoComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  constructor(private service:UsuarioService, private router:Router, private msg:ToastServiceService) { }
  error:boolean=false;
  MsgPrincipal:string= "";
  MsgDescritiva:string ="";
  key:string=""
  firstacess = new EventEmitter<boolean>();
  ngOnInit() {
    this.key = sessionStorage.getItem('chv');
    //sessionStorage.clear();
  }

 async ValidarSenha(data){
   debugger;
    let erro =false;
    let msg =`Senha é necessário no minimo 8 caracteres,
    1 letra maiuscula, 1 número e 1 caractere especial.`
    let regex3 = new RegExp("^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$");
    let teste = regex3.test(data)
    if(!teste){
      erro = true;
     }

     if(erro){
       this.MsgDescritiva = msg;
       this.error = true;
       return false
     }
      return true
  }

 async SalvarSenha(){
   let validador = await this.ValidarSenha(this.usuario.ds_senha);

   if(validador){
    let dataJson = {
      newsenha: this.usuario.ds_senha,
      data:this.key
    }
    this.service.TrocarSenha(dataJson).then((result:any) => {
      if(result.status = "sucess"){
        sessionStorage.setItem('firstacess','false');
        location.reload();
        this.firstacess.emit(false);

      }else{
        location.reload();
      }

    })
  }
}
}
