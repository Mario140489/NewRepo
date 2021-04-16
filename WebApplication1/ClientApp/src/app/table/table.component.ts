import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  _DataTable:any =[];
  _DataTableOriginal:any = [];
  @Input() DataHeader:any =[];
  @Input() set DataTable(DataTable:any){
    this.CriarArrayTabela(DataTable);
  }
  @Input() DataBtn:any=[];
  @Output() EventoBtnTable = new EventEmitter();
  TotalRegistros:number = this._DataTable.length;
  Visualizadas:number= this._DataTable.length;
  Rows:any = [5,10,50,100];
  RowsSelected:number = 5;
  IndexActive:number =0;
  constructor() { }

  ngOnInit() {

  }

  ContHeader(){

  }


  calculopaginacao(data){
    let dataorinal = data;
    data = data/this.RowsSelected;
    data =  parseInt(data);
    data = (data * this.RowsSelected) == dataorinal ? data:data+1;
    return data;
  }



  CriarArrayTabela(DataTable){
    this._DataTable = [];
    let temparray:any = [];
    let index:any = this.calculopaginacao(DataTable.length);
    if(DataTable && DataTable.length > 0){
      this._DataTableOriginal = DataTable;

      this.TotalRegistros = DataTable.length;
      let ii =0;

      for(let i=1;i<=index;i++){
        let verificador = (this.RowsSelected * i)< DataTable.length ? this.RowsSelected * i:DataTable.length
        for(ii; ii < verificador ;ii++){
          temparray.push(Object.values(DataTable[ii]));
        }
        this._DataTable.push(temparray);
        temparray = [];
      }
    }
  }

  EventoRows(){
   //alert(this.RowsSelected);
   this.IndexActive = 0
   this.CriarArrayTabela(this._DataTableOriginal);
  }

  AcionareventoPai(data,evento){
    let JsonrRetorno={
      NomeEvento:evento,
      Colunas:data
    }
    this.EventoBtnTable.emit(JsonrRetorno);

  }

}
