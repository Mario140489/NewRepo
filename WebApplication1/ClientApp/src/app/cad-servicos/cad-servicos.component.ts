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
    debugger;
    this.service.getservicos().subscribe((result:any) =>{
      for( let i = 0 ; i < result.length ; i++){
       result[i]['ds_valor'] = util.transformareais(result[i]['ds_valor']);
       result[i]['bl_ativo'] = util.tranformaativo(result[i]['bl_ativo']);
      }
      this.dataservico = result;
      this.dtTrigger.next();
    })
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
