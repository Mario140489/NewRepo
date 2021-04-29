import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class Crm_grupousuarioService {
rootURL: string;
constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
  this.rootURL= baseUrl;
 }

GetGrupoUsuarioName(parans){
  return this.http.get(this.rootURL +"api/crm_grupousuario/" + parans).pipe();
}

GetApp(){
  return this.http.get(this.rootURL +"api/Aplicativos").pipe();
}

}
