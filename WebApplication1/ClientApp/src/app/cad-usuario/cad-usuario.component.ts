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
  constructor(private serviceusuario: UsuarioService) { }

  ngOnInit() {
  }

  onSubmit(){
    //var json = JSON;
    //const key = Object.keys(this.usuario);
    this.serviceusuario.PostUsuario(this.usuario);
    //console.log(key);

  }

}
