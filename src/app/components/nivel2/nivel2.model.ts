import { Nivel1Model } from '../nivel1/nivel1.model';

export class Nivel2Model{
    id: number;
    numero: string;
    nivel1: Nivel1Model;
    andar: string;

    constructor() {}
}