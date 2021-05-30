import { Component, OnInit } from '@angular/core';

import {AuthService} from '../services/auth.service';
import {Usuario} from '../Classes/Usuario';
import { SpinerComponent } from '../spiner/spiner.component';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
MsgPrincipal:string ="";
MsgDescritiva:string="";
error:boolean = false;
public usuario: Usuario = new Usuario();

  constructor(private authservice:AuthService, private spiner:AppComponent) { }

  ngOnInit() {

  }

  async FazerLogin(){

    this.spiner.spiner = true;
    if(this.usuario.ds_login && this.usuario.ds_senha)
    {
      let jsondata={
        ds_login : this.usuario.ds_login,
        ds_senha : this.usuario.ds_senha
      }
      debugger;
      let user:any = await this.authservice.fazerlogin(this.usuario)
      if(user){
        this.spiner.spiner = false;
       }
       else{
        this.spiner.spiner = false;
        this.MsgPrincipal = "Atenção! "; this.MsgDescritiva = " Nenhum usuario encontrado";
        this.error = true;
        setTimeout(() => this.error = false, 20000);
       }

    }
    else{
      this.spiner.spiner = false;
    }

  }



}
