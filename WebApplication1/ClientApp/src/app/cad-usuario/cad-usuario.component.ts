import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Usuario } from  '../Classes/Usuario';
import { UsuarioService } from '../services/usuario.service';
import { ToastServiceService } from '../services/toast-service.service';
import { Subject } from 'rxjs';

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

  dataservico:any;
  constructor(private serviceusuario: UsuarioService, private msg:ToastServiceService) { }

  ngOnInit() {

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
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
