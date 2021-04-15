import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Usuario } from '../Classes/Usuario';

@Injectable({
  providedIn: 'root'
})



export class UsuarioService {
rootURL: string;

id_usuario = null;

constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
  this.rootURL= baseUrl;
 }

 GetUsuario(parans){
   return this.http.get(this.rootURL + "api/Usuarios/nome/" + parans);
 }

 GetUsuarioid(parans){
  return this.http.get(this.rootURL + "api/Usuarios/" + parans).toPromise();
}

 PutUsuario(data){
   return this.http.put(this.rootURL + "api/Usuarios/"+ data.Usuario.id_usuario, data).pipe();
 }

 PostUsuario(data){
   return this.http.post(this.rootURL + 'api/Usuarios/PostUsuario',data).pipe();
 }

 GetGrupoUsuarioAtivo(){
  return this.http.get(this.rootURL +"api/crm_grupousuario/ativo/").pipe();
}
 GetDepartamento(){
   return this.http.get(this.rootURL +"api/crm_departamento/combo/").toPromise();
 }

}
