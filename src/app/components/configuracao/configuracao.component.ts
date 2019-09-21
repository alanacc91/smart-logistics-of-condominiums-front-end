import { Component, OnInit } from '@angular/core';
import { PoRadioGroupOption } from '@portinari/portinari-ui';
import { ConfiguracaoService } from './configuracao.service';
import { ConfiguracaoModel } from './configuracao.model';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent implements OnInit {
  tiposDeCondominio: Array<PoRadioGroupOption>;
  tipoDeCondominio: string;
  configTipoDeCondominio: ConfiguracaoModel;
  constructor(
    private configuracaoService: ConfiguracaoService
    ) { }

  ngOnInit() {

    this.configuracaoService.selecionarConfiguracaoPorId(1).subscribe(tipoDeCondominio => {
      
      this.configTipoDeCondominio = tipoDeCondominio;
      this.tipoDeCondominio = this.configTipoDeCondominio.valor;
      this.montarGrupoDeRadio();
      
    }, () => {

      this.tipoDeCondominio = 'HORIZONTAL'
      this.montarGrupoDeRadio();

    });

  }

  montarGrupoDeRadio(): void {
    this.tiposDeCondominio = [];
    this.tiposDeCondominio.push({
      label: 'Honrizontal',
      value: 'HORIZONTAL'
    });
    this.tiposDeCondominio.push({
      label: 'Vertical',
      value: 'VERTICAL'
    });
  }

  alterarValorDoBotaoDeRadio(valor: string) {
    this.configTipoDeCondominio.valor = valor;
    this.configuracaoService.atualizarConfiguracao(this.configTipoDeCondominio).subscribe(retorno => {
      window.location.reload(false);
    });
  }

}
