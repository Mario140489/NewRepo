import { Component, OnInit } from '@angular/core';
import {ModuloService} from '../services/modulo.service';
import { MemoryModulesService } from '../services/memory-modules.service';
import {NavMenuComponent} from '../nav-menu/nav-menu.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-aplicativos',
  templateUrl: './aplicativos.component.html',
  styleUrls: ['./aplicativos.component.css']
})
export class AplicativosComponent implements OnInit {
  apps:any;
  modules:any;
  constructor( private moduleservice: ModuloService, private memorymodules: MemoryModulesService,
    private nav:NavMenuComponent, private spiner:AppComponent) { }

  ngOnInit(): void {

    this.monta_apps();

  }

  monta_apps(){

    let appppp:any = sessionStorage.getItem('apps');
    appppp = JSON.parse(appppp);
    this.apps = appppp;
     // appppp.forEach(function(value){
      // this.apps.push(value);
    //});

    console.log(JSON.stringify(this.apps));
  }

  moduloselect(parans,parans2){
    document.getElementById('menuprincipal').click();
    this.spiner.spiner = true;
    this.moduleservice.getmodulo(parans).subscribe(result =>{
      if(result){
        //sessionStorage.setItem('modulos', JSON.stringify(result));
        //sessionStorage.setItem('sidebar','true')
        this.nav.sidebar = parans2;
        this.nav.modulos = result;
        this.nav.toggled = true;
        //this.memorymodules.btn_sidebar = true;
        this.spiner.spiner = false;
        setTimeout(function(){
          document.getElementById('btnsidebar').click()
        },500);

      }
    })
  }



}
