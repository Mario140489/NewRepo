import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Crm_planodecontasService {
  rootURL: string;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
   }

   GetPlanoDeContas(parans){
     return this.http.get(this.rootURL +"/plano/"+parans).toPromise();
   }

}
