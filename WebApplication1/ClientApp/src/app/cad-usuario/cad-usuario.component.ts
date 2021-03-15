import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Usuario} from  '../Classes/Usuario';
import {UsuarioService} from '../services/usuario.service';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css']
})
export class CadUsuarioComponent implements OnInit {
  public usuario: Usuario = new Usuario;
  createForm :FormGroup;
  confsernha:string;
  loaduser:boolean = false;
  constructor(private serviceusuario: UsuarioService) { }

  ngOnInit() {
    const key = Object.keys(this.usuario);
  }

  onSubmit(){
    debugger;
    //var json = JSON;
    const key = Object.keys(this.usuario);
    console.log(key)
   /* this.loaduser= true;
    this.serviceusuario.PostUsuario(this.usuario).toPromise().then(result =>{
      this.loaduser = false;
    });*/
    //console.log(key);

  }

}
