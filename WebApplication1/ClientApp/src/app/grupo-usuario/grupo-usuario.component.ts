import { Component, OnInit } from '@angular/core';

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
    Icone:'fas fa-user-edit',
    Tooltip:"Editar Usuário",
    BtnTexto:"",
    Classe:"btn-primary",
    NomeEvento:"Editar"
  }]
  dataservico:any=[];
  constructor() { }

  ngOnInit() {
  }
  PegarEventoFilho(event){

  }
}
