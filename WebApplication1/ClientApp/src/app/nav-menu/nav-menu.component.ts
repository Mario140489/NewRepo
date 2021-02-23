import { Component } from '@angular/core';
import {MemoryModulesService} from '../services/memory-modules.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  toggled = false;
  usuario = "";
  sidebar ="Menu";
  modulos;
  menu:any=[];
  constructor(  private memorymodules: MemoryModulesService) { }
  ngOnInit() {
    debugger;
   this.usuario =  sessionStorage.getItem('user');
   this.modulos = JSON.parse(sessionStorage.getItem('modulos'));
    if(sessionStorage.getItem('sidebar') == 'true'){
      this.toggled = true;
    }else{
      this.toggled = false;
    }
  }
  OpenClose(){
  this.toggled = !this.toggled;
  $(function () {
  (<any>$('[data-toggle="tooltip"]')).tooltip()
   })
  }
  /*SelectList(){
    alert('teste')
    $('.list-group-item').click(function(){
    $('.list-group-item').removeClass('ltbranco');
    $(this).addClass('ltbranco');
})
  }*/



}
