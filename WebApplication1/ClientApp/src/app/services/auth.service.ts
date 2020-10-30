import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../Classes/Usuario';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable()
export class AuthService {

  Menu = new EventEmitter<boolean>();
  private usuarioAutenticado:boolean = false;


  constructor(private router: Router, private service: LoginService) { }

   async fazerlogin(usuario: Usuario){
     debugger;
      let user:any;
     await this.service.Login(usuario).toPromise().then( (result:any) =>{
      if (result.length > 0) {
        user = true;
        sessionStorage.setItem('user', JSON.stringify(result));
        this.usuarioAutenticado = true;
        this.Menu.emit(true);
        this.router.navigate(['/']);

      }
      else {
        user = false;
        this.usuarioAutenticado = false;
        this.Menu.emit(false);

      }
    }

    ).catch( () =>{
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
