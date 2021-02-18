import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {ModuloService} from '../services/modulo.service'

@Component({
  selector: 'app-aplicativos',
  templateUrl: './aplicativos.component.html',
  styleUrls: ['./aplicativos.component.css']
})
export class AplicativosComponent implements OnInit {
  apps:any;
  modules:any;
  constructor( private moduleservice: ModuloService) { }

  ngOnInit(): void {

    this.monta_apps();

  }

  monta_apps(){
    debugger;
    let appppp:any = sessionStorage.getItem('modulos');
    appppp = JSON.parse(appppp);
    this.apps = appppp;
     // appppp.forEach(function(value){
      // this.apps.push(value);
    //});

    console.log(JSON.stringify(this.apps));
  }

  moduloselect(parans){
    debugger;
    this.moduleservice.getmodulo(parans).subscribe(result =>{
      this.modules = result;
    })
  }
}
