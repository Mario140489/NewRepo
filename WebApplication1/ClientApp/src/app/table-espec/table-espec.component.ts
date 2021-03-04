
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { DomSanitizer } from '@angular/platform-browser';
import { data } from 'jquery';

@Component({
  selector: 'app-table-espec',
  templateUrl: './table-espec.component.html',
  styleUrls: ['./table-espec.component.css']
})



export class TableEspecComponent implements OnInit {
  @Output() DadosRow:EventEmitter<any> = new EventEmitter<any>();
  @Input() header:any = [];
  @Input() data:any = [];
  @Input() dados:any = [];
  dataold:any =[];
  datapaginada:any=[];
  html:any ='';
  Rows:any = [5,10,50,100];
  RowsSelected:number = 5;
  views:number=0;
  total:number=0;
  paginas:any=[];
  NumerosPaginas:number= 0;
  PaginaAtiva:number=1;
  MaximoPaginas: number=5;
  UltimaPagina:number=0;
  pagination:number=1;
  PaginaAnterior:number=1;
  Table:any=[];

  constructor(private sanitized: DomSanitizer,private elRef: ElementRef) { }

  ngOnInit(): void {
    debugger;
    //this.DataPaginada();
    this.MontarTable();

  }

  MostrarRowsViewsTotal(){
   this.total = this.data.length;
  }

  DataPaginada(){
    if( this.data && this.data.length > 0){

      this.MontarPaginacao();
      let i = 0;
      let Rows = this.RowsSelected;
        for(let idx = 0; idx < this.datapaginada.length; idx++){

            for(i; i < Rows; i++){
            this.datapaginada[idx].push(this.data[i])
        }
         Rows = Rows + this.RowsSelected;
        }
        this.PopularTabela();

    }

  }

    EventoRows(){
    this.MontarTable();
  }

  PopularTabela(){
    debugger;
    if(this.data &&  this.data.length > 0){
      this.Table = [];
      for(let idx = 0 ;idx < this.datapaginada[this.PaginaAtiva-1].length; idx++){
        let DadosTable:any = [];
        this.dados.forEach(element=> {
          DadosTable.push(this.datapaginada[this.PaginaAtiva-1][idx][element]);
         });
         this.Table.push(DadosTable);
         this.views = idx +1;
      }
      this.MostrarRowsViewsTotal();
    }

  }

  teste(e){
    debugger;
  console.log(e);
  }

  MontarPaginacao(){

    if(this.data &&  this.data.length > 0){

      let idx = 0;
    let i = 1;
    let pg = 0;
    let contador:number = this.data.length
    //if(this.data.length > this.MaximoPaginas){contador = this.MaximoPaginas;}
    while(idx < contador ){
      if(i < this.RowsSelected){this.paginas.push(pg++);}

      this.datapaginada.push([]);
      idx = idx + this.RowsSelected;
      //let count = this.data.length - this.RowsSelected;
      this.UltimaPagina = i++;
    }

    }

  }

  EnventoEditar(data){
   console.log("editar - "+data);
  }

  EnventoExcluir(data){
    console.log("excluir - "+data);
  }

  MontarTable(){
    this.datapaginada=[];
    this.paginas=[];
    this.DataPaginada();
  }

  Mudarpagina(pagina){
    if(pagina > 0 && pagina < this.datapaginada.length +1){
      if(pagina > this.PaginaAnterior){
        if(pagina-2 > this.pagination && pagina +2 < this.datapaginada.length +1){
          this.pagination = pagina-2;
        }
      }
      if(pagina < this.PaginaAnterior){
        if(pagina+2 > this.pagination && pagina -2 >= 1){
          this.pagination = pagina-2;
        }
      }

      this.PaginaAnterior = pagina;
      this.PaginaAtiva = pagina;
      this.PopularTabela();

    }

  }





}


