import { element } from 'protractor';
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
  Permission:any=[];
  constructor(private service: Crm_grupousuarioService,private msg:ToastServiceService) { }

  async ngOnInit() {
    await uteis.load();
    await this.PopulaComboModulo();
    let id_grupo = this.service.idgrupousuario;
    if(id_grupo){
    await this.GetGrupoUsuario(id_grupo);
    }
    await uteis.removeload();
  }

  onSubmit(f:NgForm){

  }

 async PopulaComboModulo(){
   await this.service.GetApp().toPromise().then(result =>{
    this.Modulos = result
    });
  }

   async GetGrupoUsuario(parans){

    await  this.service.GetGrupoUsuarioId(parans).toPromise().then((result:any) => {
      this._crm_grupousuario.do_inactive = result.crm_grupousuario.do_inactive;
      this._crm_grupousuario.ds_grupousuario = result.crm_grupousuario.ds_grupousuario;
      this._crm_grupousuario.id_grupousuario = result.crm_grupousuario.id_grupousuario;
      this.Submodulos = result.modulos
    })

   }

 async PopulaModeloModulos(){
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
     this.loaduser = true;
     let JsonData = {
      crm_grupousuario:this._crm_grupousuario,
      crm_grupovspermisaos:this.Permission
     }
     this.service.NewGrupo(JsonData).toPromise().then(result =>{
      this.msg.show("Salvo com sucesso.",{classe:"bg-success"});
      this.loaduser = false;
     }).catch(erro =>{
      this.msg.show(erro.error.text,{classe:"bg-danger"});
      this.loaduser= false;
     })

   }else{
    this.msg.show("Formulario Invalido Preencha os Campos em vermelho",{classe:"bg-danger"});
   }
  }

  GetPermission(parans){
    debugger;
    let permission = (<HTMLInputElement>document.getElementById(parans.id_submodulos)).checked;
    if(permission){
      let JsonData={
        do_permission:permission,
        id_submodulos:parans.id_submodulos,
      }
      this.Permission.push(JsonData);
    }
    else{
      let Index = 0
      this.Permission.forEach(element => {
        if(element.id_submodulos == parans,parans.id_submodulos){
          this.Permission.splice(Index,1);
        }
        Index++
      });
    }
  }

}
