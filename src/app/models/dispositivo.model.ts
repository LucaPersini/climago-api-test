import { DatiDispositivo } from "./dati-dispositivo.model"
import { UltimoIntervento } from "./ultimo-intervento.model"

export interface Dispositivo {
    datiDispositivo: DatiDispositivo,
    idGruppo: number,
    indirizzo: string,
    numeroPromozioni: number | null,
    prossimoAppuntamento: string | null,
    scadenzeAnnoInCorso: number | null,
    ultimoIntervento: UltimoIntervento | null
}
