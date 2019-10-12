import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoLookupFilter, PoLookupFilteredItemsParams } from '@portinari/portinari-ui';
import { Nivel1Service } from './nivel1.service';

@Injectable()
export class Nivel1LookupService implements PoLookupFilter {


  constructor(private nivel1service: Nivel1Service) { }

  getFilteredItems(filteredParams: PoLookupFilteredItemsParams): Observable<any> {
    
    if (filteredParams.filter) {
      return this.nivel1service.selecionarNiveis1PorNome(filteredParams.filter);
    } else {
      return this.nivel1service.selecionarNiveis1Paginados(filteredParams.page,filteredParams. pageSize, "ASC");
    }
    
  }

  getFilteredData(filter: string, page: number, pageSize: number): Observable<any> {
    
    let pagina: number = page; 
    let linhasPorPagina: number = pageSize; 
    let direcao: string = "ASC";

    if (filter) {
      return this.nivel1service.selecionarNiveis1PorNome(filter);
    } else {
        return this.nivel1service.selecionarNiveis1Paginados(pagina, linhasPorPagina, direcao);
    }
  }

  getObjectByValue(value: string): Observable<any> {
    return this.nivel1service.selecionarNivel1PorNome(value);
  }

}