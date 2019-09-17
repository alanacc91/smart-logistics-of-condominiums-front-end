import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    recuperarUrlPadrao() : string {
        return "http://localhost:8080";
    }
}