import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UrlService} from '../../../propriedades/url.service';
import { Observable } from 'rxjs';
import { Nivel1Model } from './nivel1.model';
@Injectable()
export class Nivel1Service {
    private url: string = '';
    constructor(
        public urlService : UrlService,
        private http: HttpClient
    ) {
        this.url = this.urlService.recuperarUrlPadrao() + '/niveis1';
    }

    selecionarNivel1PorId(id: number): Observable<any> {
        return this.http.get(this.url + '/' + id.toString());
    }

    selecionarNiveis1Paginados(): Observable<any> {
        return this.http.get(this.url + '/page');
    }

    atualizarNivel1(nivel1: Nivel1Model): Observable<any> {
        return this.http.put(this.url + '/' + nivel1.id.toString(), nivel1);
    }

    inserirNivel1(nivel1: Nivel1Model): Observable<any> {
        return this.http.post(this.url, nivel1);
    }
}