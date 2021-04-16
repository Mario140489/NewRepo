import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../Classes/Usuario';
import { UsuarioService } from '../services/usuario.service';
import { UteisService } from '../services/uteis.service';
import { Router } from '@angular/router';

const uteis = new UteisService();

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  data:any =["Id","Nome","Status"];
  dados:any =["id_usuario","ds_nome","do_inactive"];
  BtnTable:any=[{
    Id:"Editar",
    Icone:'fas fa-user-edit',
    Tooltip:"Editar Usuário",
    BtnTexto:"",
    Classe:"btn-primary",
    NomeEvento:"Editar"
  }]
  loaduser:boolean = false;
  dataservico:any=[];
  dtTrigger: Subject<any> = new Subject();

  constructor(private service:UsuarioService, private rota:Router) { }

  async ngOnInit() {
   this.service.id_usuario=null;
  }

  PegarEventoFilho(event){
    if(event.NomeEvento === "Editar"){
      this.service.id_usuario = event.Colunas[0];
      this.rota.navigate(['/cadusuario']);
    }
  }

  async BuscarUsuario(){

    this.loaduser= true;
    if(this.usuario.ds_nome){
     await this.service.GetUsuario(this.usuario.ds_nome).subscribe( result => {

      this.dataservico = uteis.FormataTableInactive(result);
       this.loaduser= false;
      },error =>{
        this.loaduser= false;
      });
    }
    else{
      this.loaduser= false;
    }
  }

  EditarUsuario(){
    alert("teste");
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  EventoRows(){

  }

}
