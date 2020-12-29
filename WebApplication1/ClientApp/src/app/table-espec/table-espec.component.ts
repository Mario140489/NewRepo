import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-espec',
  templateUrl: './table-espec.component.html',
  styleUrls: ['./table-espec.component.css']
})
export class TableEspecComponent implements OnInit {
  @Input() header:any = [];
  @Input() data:any = [];
  @Input() dados:any = [];

  constructor() { }

  ngOnInit(): void {

    this.MontarTable();

  }

  MontarTable(){
    console.log(JSON.stringify(this.data));
  }

}
