import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../Classes/Usuario';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable()
export class AuthService {

  Menu = new EventEmitter<boolean>();
  firstacess = new EventEmitter<boolean>();

  private usuarioAutenticado:boolean = false;


  constructor(private router: Router, private service: LoginService) { }

   async fazerlogin(usuario: Usuario){
     debugger;
      let user:any;
     await this.service.Login(usuario).toPromise().then( (result:any) =>{
       debugger;
      if (result) {
        user = true;
        sessionStorage.setItem('firstacess', result['do_firstacess']);
        sessionStorage.setItem('user', result['ds_nome']);
        //sessionStorage.setItem('user', "admin");
        sessionStorage.setItem('chv', result['key']);
        sessionStorage.setItem('apps',JSON.stringify(result['apps']));
        this.Menu.emit(true);
        this.firstacess.emit(result['do_firstacess']);
      }
      else {
        user = false;
        this.usuarioAutenticado = false;
        this.Menu.emit(false);

      }
    }

    ).catch( (result:any) =>{
      user = false;
      this.usuarioAutenticado = false;
      this.Menu.emit(false);
    }
    )
     return user

  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}
