import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class Crm_grupousuarioService {
rootURL: string;
idgrupousuario:any;

constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
  this.rootURL= baseUrl;
 }

GetGrupoUsuarioName(parans){
  return this.http.get(this.rootURL +"api/crm_grupousuario/" + parans).pipe();
}

GetApp(){
  return this.http.get(this.rootURL +"api/Aplicativos").pipe();
}

GetModulosIdAp(parans){
  return this.http.get(this.rootURL +"api/crm_appvsmodulo/get/"+ parans).pipe();
}

NewGrupo(parans){
  return this.http.post(this.rootURL +"api/crm_grupousuario",parans).pipe();
}

}
