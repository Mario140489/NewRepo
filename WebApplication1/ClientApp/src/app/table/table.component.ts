import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  _DataTable:any =[];
  _DataTableOriginal:any = [];
  @Input() DataHeader:any =[];
  @Input() set DataTable(DataTable:any){
    this.CriarArrayTabela(DataTable);
  }
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

  CriarArrayTabela(DataTable){
    this._DataTable = [];
    let temparray:any = [];
    let contador:number = 0;
    let index = 0;

    if(DataTable && DataTable.length > 0){
      this._DataTableOriginal = DataTable;
      this.Visualizadas = this.RowsSelected * (this.IndexActive + 1);
      this.TotalRegistros = DataTable.length;
      DataTable.forEach(element => {

        if(contador < this.RowsSelected){
          temparray.push(Object.values(element));
          if(contador == (this.RowsSelected -1)){

            this._DataTable[index] = temparray;
            contador = 0;
            index++;
            temparray = [];

          }
        }

        contador++;
      });
    }
  }

  EventoRows(){
   alert(this.RowsSelected);
   this.CriarArrayTabela(this._DataTableOriginal);
  }

  teste(data){
   alert('teste');
  }

}
