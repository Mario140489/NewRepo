import { UteisService } from './../services/uteis.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Usuario } from  '../Classes/Usuario';
import { UsuarioService } from '../services/usuario.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Subject, Subscriber } from 'rxjs';



@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css']
})
export class CadUsuarioComponent implements OnInit {
  public usuario: Usuario = new Usuario;
  createForm :FormGroup;
  confirmasenha:string;
  loaduser:boolean = false;
  dtTrigger: Subject<any> = new Subject();
  data:any =["Id","Grupo Usuario"];
  dados:any =["id_grupousuario","ds_grupousuario"];
  selectgrupousuario:any;
  grupousuario:any;
  GrupoUsuarionew:any=[];

  dataservico:any=[];
  constructor(private serviceusuario: UsuarioService, private msg:ToastServiceService,
     private uteisservice:UteisService) {

     }

  ngOnInit() {
    this.CarregaGrupoUsuario();
  }

  CarregaGrupoUsuario(){
    this.serviceusuario.GetGrupoUsuarioAtivo().subscribe(retorno =>{
       this.grupousuario = retorno;
    })
  }

  onSubmit(f:NgForm){
    if(f.valid){
    this.loaduser= true;
    this.serviceusuario.PostUsuario(this.usuario).toPromise().then((result:any) =>{
      if(result && result.id_usuario){
        this.msg.show("Salvo com sucesso.",{classe:"bg-success"});
        f.resetForm();
      }else{
        this.msg.show("Erro a o Salvar dados.",{classe:"bg-danger"});
      }
      this.loaduser = false;
    }).catch(result => {

       this.msg.show(result.error.text,{classe:"bg-danger"});
      //alert(result.error.text)
      this.loaduser = false;
    })
  }
  else{
    this.msg.show("Formulario Invalido",{classe:"bg-danger"});
  }
  }

  onSave(){
    let salvar = true;
    let id:any = (<HTMLSelectElement>document.getElementById('grupousuario')).value;
    let grupo:any = (<HTMLSelectElement>document.getElementById('grupousuario')).selectedOptions;
    grupo = grupo[0].outerText;
    let DataJson:any ={
      id_grupousuario:id,
      ds_grupousuario:grupo
    }
    if(id>0){

      this.dataservico.forEach((element:any) => {
        if(element.id_grupousuario === id){
          salvar= false;
          this.msg.show("Grupo de Usuário já incluso",{classe:"bg-danger"});
        }
      });
      if(salvar){
        this.GrupoUsuarionew.unshift(DataJson);
        this.dataservico = this.GrupoUsuarionew;
      }

    }
    else{
      this.msg.show("Selecione um grupo para poder adicionar",{classe:"bg-danger"});
    }

  }

    refleshtable(){

    }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
