import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Crm_grupousuarioService } from "../services/crm_grupousuario.service";
import { Crm_grupousuario } from "../Classes/crm_grupousuario";

@Component({
  selector: 'app-cad-grupousuario',
  templateUrl: './cad-grupousuario.component.html',
  styleUrls: ['./cad-grupousuario.component.scss']
})
export class CadGrupousuarioComponent implements OnInit {
  public _crm_grupousuario = new Crm_grupousuario();
  loaduser:boolean = false;
  createForm :FormGroup;
  Modulos:any=[];
  constructor(private service: Crm_grupousuarioService) { }

  ngOnInit() {
    this.PopulaComboModulo();
  }

  onSubmit(f:NgForm){

  }

 async PopulaComboModulo(){
   debugger;
   await this.service.GetApp().toPromise().then(result =>{
    this.Modulos = result
    });
  }

}
