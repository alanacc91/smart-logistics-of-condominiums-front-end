import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoNotificationService } from '@portinari/portinari-ui';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    public poNotification: PoNotificationService
  ) { 
    this.activatedRoute.params.subscribe( parametros => {
      this.ajustarTitulos(parametros['tipoDeCondominio']);
      // this.colunas =[
      //   { property: 'nome', type: 'string', width: '100%', label:`Tabela de ${this.tituloTabela}`}
      // ];
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

  }

  private ajustarTitulosParaTipoDeCondominioHorizontal(): void {
    this.tituloColuna = "casas";
    this.tituloTabela = "casas cadastradas";
    this.tituloModalEdicao = "Edição de casas";
    this.tituloModalExclusao = "Deseja excluir esta casa?";
    this.tituloNotificacaoInsercao = "Casa inserida";
    this.tituloNotificacaoAtualizacao = "Casa atualizada";
    this.tituloNotificacaoDelecao = "Casa excluída";
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
