import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoNotificationService, PoLookupColumn } from '@portinari/portinari-ui';
import { Nivel1LookupService } from '../nivel1/nivel1.lookup.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    public poNotification: PoNotificationService,
    public nivel1LookupService: Nivel1LookupService
  ) { 
    this.activatedRoute.params.subscribe( parametros => {
      this.ajustarTitulos(parametros['tipoDeCondominio']);
      // this.colunas =[
      //   { property: 'nome', type: 'string', width: '100%', label:`Tabela de ${this.tituloTabela}`}
      // ];
      this.listaColunasDoLookupDeNivel1 = [{ property: 'nome', label: 'Nome' }];
    });
  }

  ngOnInit() {
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
