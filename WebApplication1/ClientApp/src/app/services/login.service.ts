import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  rootURL:string;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
  }

   Login(data){
   debugger;
   return   this.http.post(this.rootURL + 'api/Usuarios/Login',data).pipe();

  }

}
