import { Component, OnInit } from '@angular/core';
import {Usuario} from '../Classes/Usuario';
@Component({
  selector: 'app-primeiroacesso',
  templateUrl: './primeiroacesso.component.html',
  styleUrls: ['./primeiroacesso.component.css']
})
export class PrimeiroacessoComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  constructor() { }
  error:boolean=false;
  MsgPrincipal:string= "";
  MsgDescritiva:string ="";
  ngOnInit() {
    sessionStorage.clear();
  }
  SalvarSenha(){
  alert('ainda não funciona');
}
}
