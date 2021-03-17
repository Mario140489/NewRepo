import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {Usuario} from '../Classes/Usuario';
import {UsuarioService} from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  data:any =["Id","Nome","inativo"];
  dados:any =["id_usuario","ds_nome","do_inactive"];
  loaduser:boolean = false;
  dataservico:any;
  dtTrigger: Subject<any> = new Subject();
  constructor(private service:UsuarioService) { }

  async ngOnInit() {

  }

  async BuscarUsuario(){
    this.loaduser= true;
    if(this.usuario.ds_nome){
     await this.service.GetUsuario(this.usuario.ds_nome).subscribe( result => {
       this.dataservico = result
       this.loaduser= false;
      },error =>{
        this.loaduser= false;
      });
    }
    else{
      this.loaduser= false;
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
