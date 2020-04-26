import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class RouterGuardService implements CanActivate {



  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  canActivate(route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):Observable<boolean>
    | boolean
    {
      if(this.authService.usuarioEstaAutenticado){
        return true
      }
       
      this.router.navigate(['/login'])
      return false
  }
}
