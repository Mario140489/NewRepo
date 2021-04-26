import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {CommonModule, registerLocaleData} from '@angular/common';
import localept from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import {RouterGuardService} from './services/router-guard.service';
import {uteis} from './Utils/uteis.js';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SpinerComponent } from './spiner/spiner.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { AplicativosComponent } from './aplicativos/aplicativos.component';
import { SubmoduloComponent } from './submodulo/submodulo.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MessagensComponent } from './messagens/messagens.component';
import { CadUsuarioComponent } from './cad-usuario/cad-usuario.component';
import { TableComponent } from './table/table.component';
import { GrupoUsuarioComponent } from './grupo-usuario/grupo-usuario.component';


registerLocaleData(localept, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    SpinerComponent,
    ModalUsuarioComponent,
    AplicativosComponent,
      SubmoduloComponent,
      UsuarioComponent,
      MessagensComponent,
      CadUsuarioComponent,
      TableComponent,
      GrupoUsuarioComponent
   ],
  imports: [NgbModule,CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '',component: HomeComponent, pathMatch: 'full' },
      { path: 'usuario',component: UsuarioComponent},
      { path: 'cadusuario', component: CadUsuarioComponent},
      { path: 'grupo',  component: GrupoUsuarioComponent },
    ]),
    DataTablesModule
  ],
  providers: [AuthService,uteis],
  bootstrap: [AppComponent]
})
export class AppModule { }
