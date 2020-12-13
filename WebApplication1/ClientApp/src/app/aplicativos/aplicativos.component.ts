import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aplicativos',
  templateUrl: './aplicativos.component.html',
  styleUrls: ['./aplicativos.component.css']
})
export class AplicativosComponent implements OnInit {
  apps:any =[];
  constructor() { }

  ngOnInit(): void {

    this.monta_apps();

  }

  monta_apps(){
    debugger;
    this.apps = sessionStorage.getItem('modulos');
    console.log(JSON.stringify(this.apps));
  }
}
