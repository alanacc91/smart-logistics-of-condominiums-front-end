import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UrlService} from '../../../propriedades/url.service';
import { Observable } from 'rxjs';
import { ConfiguracaoModel } from './configuracao.model';
@Injectable()
export class ConfiguracaoService {
    private url: string = '';
    constructor(
        public urlService : UrlService,
        private http: HttpClient
    ) {
        this.url = this.urlService.recuperarUrlPadrao() + '/configuracoes';
    }

    selecionarConfiguracaoPorId(id: number): Observable<any> {
        return this.http.get(this.url + '/' + id.toString());
    }

    atualizarConfiguracao(configuracao: ConfiguracaoModel): Observable<any> {
        return this.http.put(this.url + '/' + configuracao.id.toString(), configuracao);
    }
}