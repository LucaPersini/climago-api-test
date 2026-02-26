import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrl } from '../../environment';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  public submitLoginForm<LoginResponse>(codiceAzienda: string, email: string, password: string) {
    const header = new HttpHeaders()
      .set('codiceAzienda', codiceAzienda)
      .set('username', email)
      .set('password', password);

    return this.http.get(apiUrl.login, { headers: header });
  }

  public getListaImpianti() {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessToken() as string}`,
    );

    return this.http.get(apiUrl.ricercaImpianti, { headers: header });
  }

  public getListaDispositivi(idGruppo: number) {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessToken() as string}`,
    );

    return this.http.get(`${apiUrl.listaDispositivi}${idGruppo}`, { headers: header });
  }

  public getListaInterventi(idGruppo: number) {
    const header = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessToken() as string}`,
    );

    return this.http.get(`${apiUrl.listaInterventi}${idGruppo}`, {headers: header});
  }

  public setAuthToken(response: LoginResponse) {
    sessionStorage.setItem('accessToken', response.accessToken);
    sessionStorage.setItem('refreshToken', response.refreshToken);
  }

  public getAccessToken() {
    return sessionStorage.getItem('accessToken');
  }

  public getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
  }
}
