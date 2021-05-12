import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { Crm_grupousuarioService } from "../services/crm_grupousuario.service";
import { Crm_grupousuario } from "../Classes/crm_grupousuario";
import { UteisService } from './../services/uteis.service';
import { ToastServiceService } from '../services/toast-service.service';

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
  constructor(private service: Crm_grupousuarioService,private msg:ToastServiceService) { }

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
   debugger;
   uteis.load();
   let id:number = parseInt((<HTMLSelectElement>document.getElementById('grupousuario')).value);
   let iduser:any = sessionStorage.getItem('iduser');
   await this.service.GetModulosIdAp(id).toPromise().then(result => {
     this.Submodulos = result;
        });
    uteis.removeload();
  }

  Salvar(f:NgForm){
   if(f.valid){
     //this.loaduser = true;
     this.service.NewGrupo(this._crm_grupousuario).toPromise().then(result =>{
      this.msg.show("Salvo com sucesso.",{classe:"bg-success"});
     }).catch(erro =>{
      this.msg.show(erro.error.text,{classe:"bg-danger"});
     })

   }else{
    this.msg.show("Formulario Invalido Preencha os Campos em vermelho",{classe:"bg-danger"});
   }
  }

}
