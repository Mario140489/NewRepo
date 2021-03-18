import { Component } from '@angular/core';
import {MemoryModulesService} from '../services/memory-modules.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  toggled = false;
  //listicon = false;
  usuario = "";
  sidebar ="Menu";
  modulos;
  menu:any=[];
  submenu:any=[];

  constructor(  private memorymodules: MemoryModulesService) { }
  ngOnInit() {
   this.usuario =  sessionStorage.getItem('user');
   this.muntavariaveldinamica()
  }
  OpenClose(){

  }
  SelectList(e){
    let id:string = "#"+e+" span i";
    let mudarclasse = document.querySelector(id);
    let class1 = mudarclasse.className;
    if(class1 == "fas fa-angle-down")
    {
      mudarclasse.classList.replace("fa-angle-down","fa-angle-up")
    }else if(class1 == "fas fa-angle-up"){
      mudarclasse.classList.replace("fa-angle-up","fa-angle-down")
    }
    console.log(mudarclasse);

  }

  muntavariaveldinamica(){
    this.modulos.array.forEach(element => {
      this.submenu.add(false);
    });
  }



}
