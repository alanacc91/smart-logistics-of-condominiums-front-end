import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoNotificationService, PoLookupColumn, PoTableColumn } from '@portinari/portinari-ui';
import { Nivel1LookupService } from '../nivel1/nivel1.lookup.service';
import { Nivel2Service } from './nivel2.service';
import { Nivel2Model } from './nivel2.model';
import { Nivel1Model } from '../nivel1/nivel1.model';

@Component({
  selector: 'app-nivel2',
  templateUrl: './nivel2.component.html',
  styleUrls: ['./nivel2.component.css']
})
export class Nivel2Component implements OnInit {

  tituloColuna: string;
  tituloTabela: string;
  tituloModalEdicao: string;
  tituloModalExclusao: string;
  tipoDeCondominio: string;
  tituloNotificacaoInsercao: string;
  tituloNotificacaoAtualizacao: string;
  tituloNotificacaoDelecao: string;
  tituloNivel1Lookup: string;
  listaColunasDoLookupDeNivel1: Array<PoLookupColumn>;
  listaDeNivel2 = [];
  flagDesabilitarBotoes: boolean;
  nivel2Selecionado: Nivel2Model;
  nivel2: Nivel2Model;

  public colunas: Array<PoTableColumn> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public poNotification: PoNotificationService,
    public nivel1LookupService: Nivel1LookupService,
    private nivel2service: Nivel2Service
  ) { 
    this.activatedRoute.params.subscribe( parametros => {
      this.ajustarTitulos(parametros['tipoDeCondominio']);
      this.listaColunasDoLookupDeNivel1 = [{ property: 'nome', label: 'Nome' }];
    });
  }

  ngOnInit() {
    this.getListaDeNivel2();
    this.nivel2 = new Nivel2Model();
    this.nivel2.nivel1 = new Nivel1Model();
    this.nivel2Selecionado = new Nivel2Model();
    this.nivel2Selecionado.nivel1 = new Nivel1Model();
  }

  getListaDeNivel2(): void {
    this.nivel2service.selecionarNiveis2Paginados(0, 25, 'ASC',).subscribe(resultado => {
      this.listaDeNivel2 = resultado.content;
    }, () => {
      this.listaDeNivel2 = [];
    });
  }

  selecionarItemDaTabela(data): void {
    this.flagDesabilitarBotoes = false;
    this.nivel2Selecionado.id = data.id;
    this.nivel2Selecionado.numero = data.numero;
    this.nivel2Selecionado.andar = data.andar;
    this.nivel2Selecionado.nivel1 = data.nivel1;

  }

  desselecionarItemDaTabela(data): void {
    this.flagDesabilitarBotoes = true;
    this.nivel2Selecionado = new Nivel2Model();
    this.nivel2Selecionado.nivel1 = new Nivel1Model();
  }

  inserir(): void {
    this.nivel2service.inserirNivel2(this.nivel2).subscribe(() => {
      this.nivel2 = new Nivel2Model();
      this.nivel2.nivel1 = new Nivel1Model();
      this.getListaDeNivel2();
      this.poNotification.success(`${this.tituloNotificacaoInsercao} com sucesso!`)
    }, retorno => {
      this.nivel2 = new Nivel2Model();
      this.nivel2.nivel1 = new Nivel1Model();
      this.getListaDeNivel2();
      this.poNotification.error(retorno.error.msg);
    });
  }

  private ajustarTitulosParaTipoDeCondominioVertical(): void {
    this.tituloColuna = "apartamentos";
    this.tituloTabela = "apartamentos cadastrados";
    this.tituloModalEdicao = "Edição de apartamentos";
    this.tituloModalExclusao = "Deseja excluir este apartamento?";
    this.tituloNotificacaoInsercao = "Apartamentos inserido";
    this.tituloNotificacaoAtualizacao = "Apartamentos atualizado";
    this.tituloNotificacaoDelecao = "Apartamentos excluído";
    this.tituloNivel1Lookup = "Prédio";
    this.colunas =[
      { property: 'numero', type: 'string', width: '100%', label:'Número'},
      { property: 'nivel1.nome', type: 'string', width: '100%', label: this.tituloNivel1Lookup},
      { property: 'andar', type: 'string', width: '100%', label:'Andar'}
   ];

  }

  private ajustarTitulosParaTipoDeCondominioHorizontal(): void {
    this.tituloColuna = "casas";
    this.tituloTabela = "casas cadastradas";
    this.tituloModalEdicao = "Edição de casas";
    this.tituloModalExclusao = "Deseja excluir esta casa?";
    this.tituloNotificacaoInsercao = "Casa inserida";
    this.tituloNotificacaoAtualizacao = "Casa atualizada";
    this.tituloNotificacaoDelecao = "Casa excluída";
    this.tituloNivel1Lookup = "Rua";
    this.colunas =[
      { property: 'numero', type: 'string', width: '100%', label:'Número'},
      { property: 'nivel1.nome', type: 'string', width: '100%', label:this.tituloNivel1Lookup}
   ];
  }

  private ajustarTitulos(tipoDeCondominio): void {
    if (tipoDeCondominio) {
      this.tipoDeCondominio = tipoDeCondominio;
      if (this.tipoDeCondominio == 'VERTICAL') {
       this.ajustarTitulosParaTipoDeCondominioVertical();
      } else {
        this.ajustarTitulosParaTipoDeCondominioHorizontal();
      }
    } else {
      this.ajustarTitulosParaTipoDeCondominioHorizontal();
    }
  }

}
