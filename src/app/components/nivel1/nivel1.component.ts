import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nivel1Model } from './nivel1.model';
import { Nivel1Service } from './nivel1.service';
import { PoTableColumn, PoTableAction, PoModalAction, PoModalComponent, PoNotificationService } from '@portinari/portinari-ui';

@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.component.html',
  styleUrls: ['./nivel1.component.css']
})
export class Nivel1Component implements OnInit {
  public colunas: Array<PoTableColumn> = [];
  tituloColuna: string;
  tituloTabela: string;
  tituloModalEdicao: string;
  tituloModalExclusao: string;
  acaoDaTabela: PoTableAction;
  tipoDeCondominio: string;
  nivel1: Nivel1Model;
  nivel1Selecionado: Nivel1Model;
  listaDeNivel1 = [];
  listaDeAcoesDaTabela: Array<PoTableAction>;
  flagDesabilitarBotoes: boolean = true;
  parametroDePesquisa: string;
  tituloNotificacaoInsercao: string;
  tituloNotificacaoAtualizacao: string;
  tituloNotificacaoDelecao: string;
  acaoAtualizarDaModalDeEdicao:  PoModalAction = {
    action: () => {
      this.atualizar();
    },
    label: 'Aplicar'
  };
  acaoFecharDaModalDeEdicao: PoModalAction = {
    action: () => {
      this.cancelarEdicao();
    },
    label: 'Cancelar'
  };
  acaoDeletarDaModalDeExclusao:  PoModalAction = {
    action: () => {
      this.deletar();
    },
    label: 'Deletar'
  };
  acaoFecharDaModalDeExclusao: PoModalAction = {
    action: () => {
      this.cancelarExclusao();
    },
    label: 'Cancelar'
  };

  @ViewChild('modalDeEdicao', { static: true }) modalDeEdicao: PoModalComponent;
  @ViewChild('modalDeExclusao', { static: true }) modalDeExclusao: PoModalComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private nivel1service: Nivel1Service,
    public poNotification: PoNotificationService) {
      
    }

  ngOnInit() {
    this.getListaDeNivel1();
    this.nivel1 = new Nivel1Model();
    this.nivel1Selecionado = new Nivel1Model();
    this.activatedRoute.params.subscribe( parametros => {
      this.ajustarTitulos(parametros['tipoDeCondominio']);
      this.colunas =[
        { property: 'nome', type: 'string', width: '100%', label:`Tabela de ${this.tituloTabela}`}
      ];
    });
  }

  inserir(): void {
    this.nivel1service.inserirNivel1(this.nivel1).subscribe(() => {
      this.nivel1 = new Nivel1Model();
      this.getListaDeNivel1();
      this.poNotification.success(`${this.tituloNotificacaoInsercao} com sucesso!`)
    }, retorno => {
      this.nivel1 = new Nivel1Model();
      this.getListaDeNivel1();
      this.poNotification.error(retorno.error.msg);
    });
  }

  getListaDeNivel1(): void {
    this.nivel1service.selecionarNiveis1Paginados().subscribe(resultado => {
      this.listaDeNivel1 = resultado.content;
    }, () => {
      this.listaDeNivel1 = [];
    });
  }

  selecionarNiveis1PorNome(): void {
    this.nivel1service.selecionarNiveis1PorNome(this.parametroDePesquisa).subscribe(resultado => {
      this.listaDeNivel1 = resultado;
    }, () => {
      this.listaDeNivel1 = [];
    });
  }

  pesquisar(): void {
    if (this.parametroDePesquisa) {
      this.selecionarNiveis1PorNome();
      this.flagDesabilitarBotoes = true;
    } else {
      this.getListaDeNivel1();
      this.flagDesabilitarBotoes = true;
    }
  }

  selecionarItemDaTabela(data): void {
    this.flagDesabilitarBotoes = false;
    this.nivel1Selecionado.id = data.id;
    this.nivel1Selecionado.nome = data.nome;

  }

  desselecionarItemDaTabela(data): void {
    this.flagDesabilitarBotoes = true;
    this.nivel1Selecionado = new Nivel1Model();
  }

  atualizar(): void {
    this.nivel1service.atualizarNivel1(this.nivel1Selecionado).subscribe(() => {
      this.modalDeEdicao.close();
      this.getListaDeNivel1();
      this.poNotification.success(`${this.tituloNotificacaoAtualizacao} com sucesso!`)
    }, retorno => {
      this.getListaDeNivel1();
      this.poNotification.error(retorno.error.msg);
    });
    this.flagDesabilitarBotoes = true;
  }

  deletar(): void {
    this.nivel1service.deletarNivel1(this.nivel1Selecionado.id).subscribe(() => {
      this.modalDeExclusao.close();
      this.getListaDeNivel1();
      this.poNotification.success(`${this.tituloNotificacaoDelecao} com sucesso!`)
    }, retorno => {
      this.nivel1Selecionado = new Nivel1Model();
      this.getListaDeNivel1();
      this.poNotification.error(retorno.error.msg);
    });
    this.flagDesabilitarBotoes = true;
  }

  cancelarEdicao(): void {
    this.modalDeEdicao.close();
    this.getListaDeNivel1();
    this.flagDesabilitarBotoes = true;
  }

  cancelarExclusao(): void {
    this.modalDeExclusao.close();
    this.getListaDeNivel1();
    this.flagDesabilitarBotoes = true;

  }

  private ajustarTitulosParaTipoDeCondominioVertical(): void {
    this.tituloColuna = "prédios";
    this.tituloTabela = "prédios cadastrados";
    this.tituloModalEdicao = "Edição de prédios";
    this.tituloModalExclusao = "Deseja excluir este prédio?";
    this.tituloNotificacaoInsercao = "Prédio inserido";
    this.tituloNotificacaoAtualizacao = "Prédio atualizado";
    this.tituloNotificacaoDelecao = "Prédio excluído";

  }

  private ajustarTitulosParaTipoDeCondominioHorizontal(): void {
    this.tituloColuna = "ruas";
    this.tituloTabela = "ruas cadastradas";
    this.tituloModalEdicao = "Edição de ruas";
    this.tituloModalExclusao = "Deseja excluir esta rua?";
    this.tituloNotificacaoInsercao = "Rua inserida";
    this.tituloNotificacaoAtualizacao = "Rua atualizada";
    this.tituloNotificacaoDelecao = "Rua excluída";
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
