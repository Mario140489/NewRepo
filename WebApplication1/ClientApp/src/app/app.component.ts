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
  firstacesso:any= false
  constructor(private authService: AuthService, private router:Router){

  }
    ngOnInit() {
      debugger;
      this.usuario =  sessionStorage.getItem('user');
      this.firstacesso = sessionStorage.getItem('firstacess');
      if(this.usuario){
       this.user = true;
      }
      if(this.firstacesso == 'false'){
        this.firstacesso = false;
      }
      else{
    this.authService.Menu.subscribe(
      user => this.user = user
    );
    this.authService.firstacess.subscribe(
      first => this.firstacesso = first
    )
      }
  }

}
