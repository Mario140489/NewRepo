import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Usuario } from '../Classes/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
rootURL: string;

constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
  this.rootURL= baseUrl;
 }

 GetUsuario(parans){

   return this.http.get(this.rootURL + "api/Usuarios/" + parans);
 }

 PostUsuario(data){
   return this.http.post(this.rootURL + 'api/Usuarios/PostUsuario',data).pipe();
 }

}
