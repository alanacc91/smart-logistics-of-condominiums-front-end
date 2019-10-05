import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    recuperarUrlPadrao() : string {
        return "http://192.168.0.102:8080";
    }
}