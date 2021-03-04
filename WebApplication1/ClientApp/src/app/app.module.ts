import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {registerLocaleData} from '@angular/common';
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
import { IncioagendamentoComponent } from './incioagendamento/incioagendamento.component';
import { CadServicosComponent } from './cad-servicos/cad-servicos.component';
import { AplicativosComponent } from './aplicativos/aplicativos.component';
import { ProcessosComponent } from './processos/processos.component';
import { TableEspecComponent } from './table-espec/table-espec.component';
import { SubmoduloComponent } from './submodulo/submodulo.component';
import { UsuarioComponent } from './usuario/usuario.component';


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
    IncioagendamentoComponent,
    CadServicosComponent,
    AplicativosComponent,
    ProcessosComponent,
    TableEspecComponent,
      SubmoduloComponent,
      UsuarioComponent
   ],
  imports: [NgbModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '',component: ProcessosComponent, pathMatch: 'full' },
      { path: 'usuario',component: UsuarioComponent,  },
      { path: 'fetch-data',  component: FetchDataComponent },
    ]),
    DataTablesModule
  ],
  providers: [AuthService,uteis],
  bootstrap: [AppComponent]
})
export class AppModule { }
