import { Component, OnInit, ViewChild } from '@angular/core';
import { Crm_planodecontasService } from '../services/crm_planodecontas.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-centrodecusto',
  templateUrl: './centrodecusto.component.html',
  styleUrls: ['./centrodecusto.component.css']
})
export class CentrodecustoComponent implements OnInit {
  @ViewChild(TableComponent) child:TableComponent
  loaduser:boolean = false;
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
  constructor(private service:Crm_planodecontasService) { }

  ngOnInit() {
  }

  GetPlano(){
    this.loaduser=true;
    let NamePlano:any = document.getElementById('nameplano');
    NamePlano = ( NamePlano as HTMLInputElement).value;
    this.service.GetPlanoDeContas(NamePlano).then(result => {
      this.loaduser = false;
      this.dataservico = result;
    }).catch(erro => {
      this.loaduser = false;
    });
  }

  PegarEventoFilho(e){

  }
}
