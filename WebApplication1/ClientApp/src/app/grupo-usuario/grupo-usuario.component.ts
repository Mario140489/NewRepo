import { Component, OnInit } from '@angular/core';
import { Crm_grupousuarioService } from '../services/crm_grupousuario.service';
import { ToastServiceService } from '../services/toast-service.service';
import { UteisService } from '../services/uteis.service';
import { Router } from '@angular/router';
import { Crm_grupousuario } from '../Classes/crm_grupousuario';


@Component({
  selector: 'app-grupo-usuario',
  templateUrl: './grupo-usuario.component.html',
  styleUrls: ['./grupo-usuario.component.css']
})
export class GrupoUsuarioComponent implements OnInit {
  loaduser:boolean = false;
  public grupo: Crm_grupousuario = new Crm_grupousuario;
  data:any =["Id","Nome","Status"];
  BtnTable:any=[{
    Id:"Editar",
    Icone:'fas fa-pen',
    Tooltip:"Editar Grupo",
    BtnTexto:"",
    Classe:"btn-primary",
    NomeEvento:"Editar"
  },{
    Id:"Excluir",
    Icone:'fas fa-trash-alt',
    Tooltip:"Excluir Grupo",
    BtnTexto:"",
    Classe:"btn-danger",
    NomeEvento:"Excluir"
  }]
  dataservico:any=[];
  constructor(private servicegrupo:Crm_grupousuarioService,private rota:Router,
     private Toast:ToastServiceService, private uteis:UteisService) { }

  ngOnInit() {
  }

  PegarEventoFilho(event){
    if(event.NomeEvento === "Editar"){
      this.servicegrupo.idgrupousuario = event.Colunas[0];
      this.rota.navigate(['/cadgrupo']);
    }
  }

  SearchGrupo(){
    this.loaduser = true;
    let NameGrupo = document.getElementById("namegrupo")
    let parans = (NameGrupo as HTMLInputElement).value;
    this.servicegrupo.GetGrupoUsuarioName(parans).toPromise().then(result =>{
      this.dataservico = this.uteis.FormataTableInactive(result);
      this.loaduser =false;
    }).catch(error =>{
      console.log(error);
      this.Toast.show(error,{classe:"bg-danger"});
      this.loaduser =false;
    })
  }

}
