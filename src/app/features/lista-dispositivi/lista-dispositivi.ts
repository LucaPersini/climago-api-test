import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { retry, catchError, EMPTY } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { ErrorService } from '../../services/error.service';

import { Dispositivo } from '../../models/dispositivo.model';
import { Intervento } from '../../models/intervento.model';

@Component({
  selector: 'app-lista-dispositivi',
  imports: [RouterLink],
  templateUrl: './lista-dispositivi.html',
  styleUrl: './lista-dispositivi.css',
})
export class ListaDispositivi {
  private clientService = inject(ClientService);
  private errorService = inject(ErrorService);
  private route = inject(ActivatedRoute);
  private changeDetection = inject(ChangeDetectorRef);

  public listaDispositivi: Dispositivo[] = [];
  public apertoModalDettagliDispositivo = false;
  public apertoModalListaInterventi = false;
  public dispositivoSelezionato = this.listaDispositivi[0];
  public listaInterventi: Intervento[] = [];
  public id = 0;

  constructor() {
    this.id = this.route.snapshot.params['idGruppo'];
    const impianto = this.clientService.getListaDispositivi(this.id)
      .pipe(
      retry(3),
      catchError((error) => {
        alert(this.errorService.getErrorMsg(error));
        return EMPTY;
      }),
    ).subscribe((result) => {
      this.listaDispositivi = result as Dispositivo[];
      console.log('Lista dispositivi ricevuta')
      this.changeDetection.detectChanges();
    });

    const interventi = this.clientService.getListaInterventi(this.id)
      .pipe(
      retry(3),
      catchError((error) => {
        alert(this.errorService.getErrorMsg(error));
        return EMPTY;
      }),
    ).subscribe((result) => {
      this.listaInterventi = result as Intervento[];
      console.log('Lista interventi ricevuta')
      this.changeDetection.detectChanges();
    });
  }

  public apriModalDettagliDispositvo(dispositivo: Dispositivo) {
    this.apertoModalDettagliDispositivo = !this.apertoModalDettagliDispositivo;
    this.dispositivoSelezionato = dispositivo;
  }
}
