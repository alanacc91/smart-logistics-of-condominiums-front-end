import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nivel1Model } from './nivel1.model';
import { Nivel1Service } from './nivel1.service';
import { PoTableColumn } from '@portinari/portinari-ui';

@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.component.html',
  styleUrls: ['./nivel1.component.css']
})
export class Nivel1Component implements OnInit {
  titulo: string;
  tipoDeCondominio: string;
  nivel1: Nivel1Model;
  colunas: Array<PoTableColumn>;
  listaDeNivel1: Array<Nivel1Model>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private nivel1service: Nivel1Service) { }

  ngOnInit() {
    this.colunas = this.getColunas();
    this.getListaDeNivel1();
    this.nivel1 = new Nivel1Model();
    this.activatedRoute.params.subscribe( parametros => {
      if (parametros['tipoDeCondominio']) {
        this.tipoDeCondominio = parametros['tipoDeCondominio'];
        if (this.tipoDeCondominio == 'VERTICAL') {
          this.titulo = "prédios";
        } else {
          this.titulo = "ruas";
        }
      } else {
        this.titulo = "ruas";
      }
    });
  }

  inserir(): void {
    this.nivel1service.inserirNivel1(this.nivel1).subscribe(retorno => {
      this.nivel1 = new Nivel1Model();
      this.getListaDeNivel1();
    }, retorno => {
      this.nivel1 = new Nivel1Model();
      this.getListaDeNivel1();
    });
  }

  getColunas(): Array<PoTableColumn> {
    return [
      { property: 'nome', type: 'string', width: '8%'}
    ];
  }

  getListaDeNivel1(): void {
    this.nivel1service.selecionarNiveis1Paginados().subscribe(listaDeNivel1 => {
      this.listaDeNivel1 = listaDeNivel1;
    }, () => {
      this.listaDeNivel1 = [];
    });
    
  }

}
