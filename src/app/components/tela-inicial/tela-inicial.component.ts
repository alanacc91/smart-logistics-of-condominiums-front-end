import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@portinari/portinari-ui';
import { ConfiguracaoService } from '../configuracao/configuracao.service';
import { ConfiguracaoModel } from '../configuracao/configuracao.model';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {
  menus: Array<PoMenuItem>;
  
  nomeMenuNivel1: string;
  nomeMenuNivel2: string;
  nomeMenuNivel2Abreviado: string;
  tipoDeCondominio: ConfiguracaoModel;
  constructor(
    private configuracaoService: ConfiguracaoService
    ) { 
    
  }

  ngOnInit() {
    this.configuracaoService.selecionarConfiguracaoPorId(1).subscribe(tipoDeCondominio => {
      
      this.tipoDeCondominio = tipoDeCondominio;
      
      if (this.tipoDeCondominio.valor == 'VERTICAL') {
        this.nomeMenuNivel1 = 'Prédios'
        this.nomeMenuNivel2 = 'Apartamentos'
        this.nomeMenuNivel2Abreviado = 'Apart.'
      } else {
        this.nomeMenuNivel1 = 'Ruas'
        this.nomeMenuNivel2 = 'Casas'
        this.nomeMenuNivel2Abreviado = 'Casas'
      }

      this.montarMenu();
    }, () => {

      this.tipoDeCondominio.id = 1;
      this.tipoDeCondominio.descricao = 'tipo_de_condominio';
      this.tipoDeCondominio.valor = 'HORIZONTAL';
      this.nomeMenuNivel1 = 'Ruas'

      this.montarMenu();
    });

  }

  montarMenu() : void {
    this.menus = [];
    this.menus.push({
      label: 'Início', 
      link: '/tela-inicial',
      icon: 'po-icon-world', 
      shortLabel: 'Início'
    });
    this.menus.push({
      label: 'Configurações', 
      link: '/tela-inicial/configuracao',
      icon: 'po-icon-settings', 
      shortLabel: 'Configurar'
    });
    this.menus.push({
      label: this.nomeMenuNivel1, 
      link: '/tela-inicial/nivel1/' + this.tipoDeCondominio.valor,
      icon: 'po-icon-company', 
      shortLabel: this.nomeMenuNivel1,
    });
    this.menus.push({
      label: this.nomeMenuNivel2, 
      link: '/tela-inicial/nivel2/' + this.tipoDeCondominio.valor,
      icon: 'po-icon-home', 
      shortLabel: this.nomeMenuNivel2Abreviado,
    });
    this.menus.push({
      label: 'Moradores', 
      link: '/tela-inicial/morador',
      icon: 'po-icon-users', 
      shortLabel: 'Moradores',
    });
    this.menus.push({
      label: 'Áreas Comuns', 
      link: '/tela-inicial/area-comum',
      icon: 'po-icon-agro-business', 
      shortLabel: 'Ár. Comuns',
    });
  }
  
}
