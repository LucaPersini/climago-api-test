import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

import { ClientService } from '../../services/client.service';
import { ErrorService } from '../../services/error.service';
import { LoginResponse } from '../../models/login-response.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router) { }

  clientService = inject(ClientService);
  errorService = inject(ErrorService);

  loginForm = new FormGroup({
    codiceAzienda: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorOccurred = false;
  errorMsg = '';

  submitLoginForm() {
    if (
      this.loginForm.controls.codiceAzienda.invalid ||
      this.loginForm.controls.email.invalid ||
      this.loginForm.controls.password.invalid
    ) {
      this.errorOccurred = true;
      this.errorMsg = 'Dati inseriti non corretti';
    } else {
      this.errorOccurred = false;
      this.clientService
        .submitLoginForm(
          this.loginForm.value.codiceAzienda!,
          this.loginForm.value.email!,
          this.loginForm.value.password!,
        )
        .pipe(
          catchError((error) => {
            this.errorOccurred = true;
            this.errorMsg = this.errorService.getErrorMsg(error);
            return EMPTY;
          }),
        )
        .subscribe((response) => {
          console.log('Accesso effettuato');
          this.clientService.setAuthToken(response as LoginResponse);
          this.router.navigate(['/impianti']);
        });
    }
  }
}
