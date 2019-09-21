import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@portinari/portinari-ui';
import { PoPageLoginModule, PoModalPasswordRecoveryModule } from '@portinari/portinari-templates';
import { PaginaDeLoginComponent } from './components/pagina-de-login/pagina-de-login.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { UrlService } from 'src/propriedades/url.service';
import { ConfiguracaoService } from './components/configuracao/configuracao.service';
import { Nivel1Component } from './components/nivel1/nivel1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Nivel2Component } from './components/nivel2/nivel2.component';
import { MoradorComponent } from './components/morador/morador.component';
import { AreaComumComponent } from './components/area-comum/area-comum.component';
import { Nivel1Service } from './components/nivel1/nivel1.service';

@NgModule({
  declarations: [
    AppComponent,
    PaginaDeLoginComponent,
    TelaInicialComponent,
    ConfiguracaoComponent,
    Nivel1Component,
    Nivel2Component,
    MoradorComponent,
    AreaComumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoPageLoginModule,
    PoModalPasswordRecoveryModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [
    PoModule
  ],
  providers: [
    UrlService, 
    ConfiguracaoService,
    Nivel1Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
