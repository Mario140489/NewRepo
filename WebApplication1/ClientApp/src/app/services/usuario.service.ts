import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
rootURL: string;

constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
  this.rootURL= baseUrl;
 }

 GetUsuario(parans){
   debugger
   return this.http.get(this.rootURL + "api/Usuarios/",parans).pipe();
 }

}
