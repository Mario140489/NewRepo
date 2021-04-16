import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  rootURL:string;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
  }

  getmodulo(parans){
    return this.http.get(this.rootURL + 'api/crm_appvsmodulo/'+parans);
  }

}
