import { Component, OnInit } from '@angular/core';
import { Crm_grupousuarioService } from '../services/crm_grupousuario.service';
import { ToastServiceService } from '../services/toast-service.service';
import { UteisService } from '../services/uteis.service';

@Component({
  selector: 'app-grupo-usuario',
  templateUrl: './grupo-usuario.component.html',
  styleUrls: ['./grupo-usuario.component.css']
})
export class GrupoUsuarioComponent implements OnInit {
  loaduser:boolean = false;
  data:any =["Id","Nome","Status"];
  BtnTable:any=[{
    Id:"Editar",
    Icone:'fas fa-pen',
    Tooltip:"Editar Grupo",
    BtnTexto:"",
    Classe:"btn-primary",
    NomeEvento:"Editar"
  }]
  dataservico:any=[];
  constructor(private servicegrupo:Crm_grupousuarioService, private Toast:ToastServiceService, private uteis:UteisService) { }

  ngOnInit() {
  }

  PegarEventoFilho(event){

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
