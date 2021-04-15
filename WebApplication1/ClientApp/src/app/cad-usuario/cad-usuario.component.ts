import { UteisService } from './../services/uteis.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Usuario } from  '../Classes/Usuario';
import { UsuarioService } from '../services/usuario.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Subject, Observable, of} from 'rxjs';
import { TableService } from '../services/table.service';
import { TableComponent } from '../table/table.component';


const uteis = new UteisService();

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
  ListDepartamento:any;
  @ViewChild(TableComponent) child:TableComponent

  dataservico:any=[];
  constructor(private serviceusuario: UsuarioService, private msg:ToastServiceService,
     private uteisservice:UteisService, private tbservice:TableService) {

     }

  async ngOnInit() {
   uteis.load();
   await this.CarregarDepartamento();
   await this.CarregaGrupoUsuario();
   await this.CarregarUsuario();
   this.child.CriarArrayTabela(this.dataservico);
   uteis.removeload();
  }

 async CarregarUsuario(){
    if(this.serviceusuario.id_usuario){
     await this.serviceusuario.GetUsuarioid(this.serviceusuario.id_usuario).
      then((result:any) =>{
      if(result){
        this.usuario.id_usuario = result.id_usuario;
        this.usuario.ds_nome = result.ds_nome;
        this.usuario.id_departamento = result.id_departamento;
        this.usuario.ds_login = result.ds_login;
        this.usuario.do_inactive = result.do_inactive;
        this.dataservico = result.departamentos;
      }
      })
   }
  }

  CarregaGrupoUsuario(){
    this.serviceusuario.GetGrupoUsuarioAtivo().subscribe(retorno =>{
       this.grupousuario = retorno;
    })
  }

  onSubmit(f:NgForm){
    if(f.valid){
    this.loaduser= true;
    this.usuario.id_departamento = parseInt(this.usuario.id_departamento);
    this.usuario['grupousuario']=this.GrupoUsuarionew;
    this.serviceusuario.PostUsuario(this.usuario).toPromise().then((result:any) =>{
      if(result && result.id_usuario){
        this.msg.show("Salvo com sucesso.",{classe:"bg-success"});
        f.resetForm();
      }else{
        this.msg.show("Erro a o Salvar dados.",{classe:"bg-danger"});
      }
      this.loaduser = false;
    }).catch(result => {
       debugger;
       this.msg.show(result.error.text,{classe:"bg-danger"});
      //alert(result.error.text)
      this.loaduser = false;
    })
  }
  else{
    this.msg.show("Formulario Invalido Preencha os Campos em vermelho",{classe:"bg-danger"});
  }
  }

 async CarregarDepartamento(){
  await this.serviceusuario.GetDepartamento().then((result:any) => {
      this.ListDepartamento = result;
   })
  }

  onSave(){
    let salvar = true;
    let id:number = parseInt((<HTMLSelectElement>document.getElementById('grupousuario')).value);
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
        this.dataservico.unshift(DataJson)
        this.child.CriarArrayTabela(this.dataservico);
      }

    }
    else{
      this.msg.show("Selecione um grupo para poder adicionar",{classe:"bg-danger"});
    }

  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
