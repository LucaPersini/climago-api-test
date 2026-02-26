import { Indirizzo } from "./indirizzo.model"

export interface Impianto {
    idGruppo: number,
    indirizzo: Indirizzo,
    numeroDispositivi: number,
    numeroPromozioni: number,
    numeroScadenze: number
}
