export interface Intervento {
    cliente: String,
    comment: String | null,
    dataIntervento: String,
    idGruppo: number,
    idIntervento: number,
    idJob: number,
    idPannelloControllo: number,
    idTecnicoResponsabile: number,
    rate: number | null,
    tecnicoResponsabile: String
}
