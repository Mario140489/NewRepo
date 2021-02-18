import { Component, OnInit } from '@angular/core';
import {ServicosService} from '../services/servicos.service';
import { Subject } from 'rxjs';
import { uteis } from '../Utils/uteis'
var util = new uteis();
@Component({
  selector: 'app-cad-servicos',
  templateUrl: './cad-servicos.component.html',
  styleUrls: ['./cad-servicos.component.css']
})


export class CadServicosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dataservico:any;
  data:any =["teste","teste2"];
  dados:any =["id_servico","ds_descricao"];
  dtTrigger: Subject<any> = new Subject();
  constructor( private service: ServicosService) { }

  ngOnInit(): void {
    this.getservicos();
    this.dtOptions = {
      pagingType: 'full_numbers',
      paging: true
    };

  }

  getservicos(){
    this.service.getservicos().subscribe((result:any) =>{
      for( let i = 0 ; i < result.length ; i++){
       result[i]['ds_valor'] = util.transformareais(result[i]['ds_valor']);
       result[i]['bl_ativo'] = util.tranformaativo(result[i]['bl_ativo']);
      }
      this.dataservico = result;
      this.dtTrigger.next();
    })
    this.dataservico  =[{'id_servico':1,'ds_descricao':"teste"},{'id_servico':2,'ds_descricao':"teste2"},
    {'id_servico':3,'ds_descricao':"teste3"},{'id_servico':4,'ds_descricao':"teste4"},
    {'id_servico':5,'ds_descricao':"teste5"},{'id_servico':6,'ds_descricao':"teste6"},
    {'id_servico':7,'ds_descricao':"teste7"},{'id_servico':8,'ds_descricao':"teste8"}]
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
