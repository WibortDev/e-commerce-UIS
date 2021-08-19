import { Injectable } from '@angular/core';
import Sweet from 'sweetalert2';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorDefault = 'Algo salió mal';
        if (error.error.message) {
          errorDefault = error.error.message;
        }

        Sweet.fire({
          title: 'Error',
          text: errorDefault,
          icon: 'error',
          confirmButtonText: 'Ok'
        })

        return throwError(error);
      })
    );
  }
}
