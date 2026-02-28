import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err) => {
      const msg =
        err?.status === 0
          ? 'Server not reachable (JSON Server not running)'
          : `Error ${err.status}: ${err.statusText || 'Request failed'}`;

      snack.open(msg, 'Close', { duration: 3000 });
      return throwError(() => err);
    })
  );
};