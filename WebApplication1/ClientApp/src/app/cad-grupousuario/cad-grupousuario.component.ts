import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Crm_grupousuarioService } from "../services/crm_grupousuario.service";
import { Crm_grupousuario } from "../Classes/crm_grupousuario";
import { UteisService } from './../services/uteis.service';

const uteis = new UteisService();
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
  Submodulos:any=[];
  constructor(private service: Crm_grupousuarioService) { }

  ngOnInit() {
    uteis.load();
    this.PopulaComboModulo();
    uteis.removeload();
  }

  onSubmit(f:NgForm){

  }

 async PopulaComboModulo(){
   await this.service.GetApp().toPromise().then(result =>{
    this.Modulos = result
    });
  }

 async PopulaModeloModulos(){
   uteis.load();
   let id:number = parseInt((<HTMLSelectElement>document.getElementById('grupousuario')).value);
   await this.service.GetModulosIdAp(id).toPromise().then(result => {
     this.Submodulos = result;
        });
    uteis.removeload();
  }

}
