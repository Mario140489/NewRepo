import { Component, OnInit } from '@angular/core';
import { asapScheduler } from 'rxjs';
import {Usuario} from '../Classes/Usuario';
import {UsuarioService} from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  data:any =["Id","Nome"];
  dados:any = ["id_usuario",'ds_nome'];
  dataservico:any;

  constructor(private service:UsuarioService) { }

  ngOnInit() {
  }

  BuscarUsuario(){
    debugger;
    if(this.usuario.ds_nome){
      this.service.GetUsuario(this.usuario.ds_nome).subscribe( result => {
        this.dataservico = result;
      });
    }
  }

}
