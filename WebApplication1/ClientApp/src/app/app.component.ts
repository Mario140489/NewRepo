import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  user:boolean = false;
  spiner:boolean = false;
  usuario ="";
  constructor(private authService: AuthService, private router:Router){

  }
    ngOnInit() {
      this.router.navigate(['/']);
      this.usuario =  sessionStorage.getItem('user');
      if(this.usuario){
    this.user = true;
      }
      else{
    this.authService.Menu.subscribe(
      user => this.user = user
    );
      }
  }

}
