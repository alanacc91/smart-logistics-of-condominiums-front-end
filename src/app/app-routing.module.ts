import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { PaginaDeLoginComponent } from './components/pagina-de-login/pagina-de-login.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { Nivel1Component } from './components/nivel1/nivel1.component';
import { Nivel2Component } from './components/nivel2/nivel2.component';
import { MoradorComponent } from './components/morador/morador.component';
import { AreaComumComponent } from './components/area-comum/area-comum.component';


const routes: Routes = [
  {
    path: 'tela-inicial',
    component: TelaInicialComponent,
    children: [
      {
        path: 'configuracao',
        component: ConfiguracaoComponent
      },
      {
        path: 'nivel1',
        component: Nivel1Component
      },
      {
        path: 'nivel2',
        component: Nivel2Component
      },
      {
        path: 'morador',
        component: MoradorComponent
      },
      {
        path: 'area-comum',
        component: AreaComumComponent
      }
    ]
  },
  {
    path: '',
    component: PaginaDeLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
