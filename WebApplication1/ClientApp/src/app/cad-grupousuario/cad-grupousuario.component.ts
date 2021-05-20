import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { Crm_grupousuarioService } from "../services/crm_grupousuario.service";
import { Crm_grupousuario } from "../Classes/crm_grupousuario";
import { UteisService } from './../services/uteis.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Router } from '@angular/router';

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
  constructor(private service: Crm_grupousuarioService,private msg:ToastServiceService,
    private rota:Router) { }

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
    debugger;
    await  this.service.GetGrupoUsuarioId(parans).toPromise().then((result:any) => {
      this._crm_grupousuario.do_inactive = result.crm_grupousuario.do_inactive;
      this._crm_grupousuario.ds_grupousuario = result.crm_grupousuario.ds_grupousuario;
      this._crm_grupousuario.id_grupousuario = result.crm_grupousuario.id_grupousuario;
      this.Submodulos = result.modulos;
    })

   }

   PopulaPermission(data){
     for(let i =0;i < data.length;i++){
         let JsonData = {
          id_grupovspermisao: data[i].id_grupovspermisao,
          id_submodulos : data[i].id_submodulos,
          do_permission : data && data[i].do_permission?data[i].do_permission:false
         }

         this.Permission.push(JsonData);
     }
   }

 async PopulaModeloModulos(){
   uteis.load();
   let id:number = parseInt((<HTMLSelectElement>document.getElementById('grupousuario')).value);
   let iduser:any = sessionStorage.getItem('iduser');
   await this.service.GetModulosIdAp(id).toPromise().then((result:any) => {
     this.Submodulos = result;
     this.PopulaPermission(result[0].submodulos);
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
     if(this._crm_grupousuario.id_grupousuario){

      this.service.UpdateGrupoUsuario(JsonData).toPromise().then(result =>{
        this.msg.show("Salvo com sucesso.",{classe:"bg-success"});
        this.loaduser= false;
        this.rota.navigate(['/grupo']);
      }).catch(erro =>{
        this.msg.show(erro.error.text,{classe:"bg-danger"});
        this.loaduser= false;
      })
     }
     else{
      this.service.NewGrupo(JsonData).toPromise().then(result =>{
        this.msg.show("Salvo com sucesso.",{classe:"bg-success"});
        this.loaduser = false;
        this.rota.navigate(['/grupo']);
       }).catch(erro =>{
        this.msg.show(erro.error.text,{classe:"bg-danger"});
        this.loaduser= false;
       })
     }


   }else{
    this.msg.show("Formulario Invalido Preencha os Campos em vermelho",{classe:"bg-danger"});
  }
  }
  GetPermission(parans){

    let permission = (<HTMLInputElement>document.getElementById(parans.id_submodulos)).checked;

      for(let i =0 ; i < this.Permission.length; i++){
        if(parans.id_submodulos == this.Permission[i].id_submodulos){
           this.Permission[i].do_permission = permission;
        }
      }

  }

}
