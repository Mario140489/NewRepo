import { Component } from '@angular/core';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';

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

  ngOnInit() {
   this.usuario =  sessionStorage.getItem('user');
   this.usuario = JSON.parse(this.usuario);
   this.usuario = this.usuario[0]['ds_nome'];
  }
  OpenClose(){
  this.toggled = !this.toggled;
  $(function () {
  (<any>$('[data-toggle="tooltip"]')).tooltip()
   })
  }
  SelectList(){
    $('.list-group-item').click(function(){
    $('.list-group-item').removeClass('ltbranco');
    $(this).addClass('ltbranco');
})
  }



}
