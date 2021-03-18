import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Usuario} from  '../Classes/Usuario';
import {UsuarioService} from '../services/usuario.service';
import {ToastServiceService} from '../services/toast-service.service';

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css']
})
export class CadUsuarioComponent implements OnInit {
  public usuario: Usuario = new Usuario;
  createForm :FormGroup;
  confsernha:string;
  loaduser:boolean = false;
  constructor(private serviceusuario: UsuarioService, private servicemsg:ToastServiceService) { }

  ngOnInit() {

  }

  onSubmit(){
    debugger;

    this.loaduser= true;
    this.serviceusuario.PostUsuario(this.usuario).toPromise().then((result:any) =>{
      if(result && result.id_usuario){
        alert('sucesso');
      }else{
        alert(result);
      }
      this.loaduser = false;
    }).catch(result => {

      this.servicemsg.show({messagem:"Erro ao inserir dados",class:"bg-danger"})
      //alert(result.error.text)
      this.loaduser = false;
    })
  }

}
