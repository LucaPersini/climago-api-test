import { Routes } from '@angular/router';

import { Login } from './features/login/login';
import { ListaImpianti } from './features/lista-impianti/lista-impianti';
import { ListaDispositivi } from './features/lista-dispositivi/lista-dispositivi';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'impianti',
    component: ListaImpianti,
  },
  {
    path: 'impianti/:idGruppo',
    component: ListaDispositivi,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
