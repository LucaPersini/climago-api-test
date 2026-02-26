import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private router: Router) {};

  public getErrorMsg(error: HttpErrorResponse) {
    switch (error.status) {
      case 400: {
        this.router.navigate(["/login"]);
        return error.error.errore;
      }
      case 401: {
        this.router.navigate(["/login"]);
        return "Unauthorized";
      }
      case 403: return "Forbidden";
      case 404: return "Not found";
      case 500: return "Internal server error";
      default: return "Unexpected error occurred";
    }
  }
}
