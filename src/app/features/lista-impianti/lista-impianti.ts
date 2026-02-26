import { Component, inject, ChangeDetectorRef} from '@angular/core';
import { catchError, EMPTY, retry } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { ErrorService } from '../../services/error.service';

import { Impianto } from '../../models/impianto.model';

@Component({
  selector: 'app-lista-impianti',
  imports: [],
  templateUrl: './lista-impianti.html',
  styleUrl: './lista-impianti.css',
})
export class ListaImpianti {
  private clientService = inject(ClientService);
  private errorService = inject(ErrorService);
  private changeDetection = inject(ChangeDetectorRef);

  public listaImpianti: Impianto[] = [];

  ngOnInit() {
    this.getListaImpianti();
  }

  constructor(private router: Router) {}

  private getListaImpianti() {
    this.clientService.getListaImpianti().pipe(
      retry(3),
      catchError((error) => {
        alert(this.errorService.getErrorMsg(error));
        return EMPTY;
      }),
    ).subscribe((result) => {
      this.listaImpianti = result as Impianto[];
      console.log('Lista impianti ricevuta');
      this.changeDetection.detectChanges();
    })
  }

  public goToListaDispositivi(idGruppo: number, impianto: Impianto) {
    this.router.navigate(['/impianti', idGruppo], {state: {impianto: impianto}});
  }
}
