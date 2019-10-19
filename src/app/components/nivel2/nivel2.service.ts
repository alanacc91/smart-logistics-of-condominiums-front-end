import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UrlService} from '../../../propriedades/url.service';
import { Observable } from 'rxjs';
import { Nivel2Model } from './nivel2.model';
@Injectable()
export class Nivel2Service {
    private url: string = '';
    constructor(
        public urlService : UrlService,
        private http: HttpClient
    ) {
        this.url = this.urlService.recuperarUrlPadrao() + '/niveis2';
    }

    selecionarNivel2PorId(id: number): Observable<any> {
        return this.http.get(this.url + '/' + id.toString());
    }

    // selecionarNivel2PorNome(nome: string): Observable<any> {
    //     return this.http.get(`${this.url}/nome/lookup/${nome}`);
    // }

    selecionarNiveis2Paginados(pagina: number, linhasPorPagina: number, direcao: string): Observable<any> {
        let queryParams: string;
        queryParams = "?ordenacao=numero";
        
        if (pagina) {
            queryParams = `${queryParams}&pagina=${pagina}`
        }

        if (linhasPorPagina) {
            queryParams = `${queryParams}&linhasPorPagina=${linhasPorPagina}`
        }

        if (direcao) {
            queryParams = `${queryParams}&direcao=${direcao}`
        }

        return this.http.get(`${this.url}/page${queryParams}`);
    }

    // selecionarNiveis1(): Observable<any> {
    //     return this.http.get(this.url + '/all');
    // }

    // selecionarNiveis1PorNome(nome: string): Observable<any> {
    //     return this.http.get(`${this.url}/nome/${nome}`);
    // }

    atualizarNivel2(Nivel2: Nivel2Model): Observable<any> {
        return this.http.put(this.url + '/' + Nivel2.id.toString(), Nivel2);
    }

    inserirNivel2(Nivel2: Nivel2Model): Observable<any> {
        return this.http.post(this.url, Nivel2);
    }

    deletarNivel2(id: number): Observable<any> {
        return this.http.delete(`${this.url}/${id}` );
    }
}