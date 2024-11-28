// src/app/core/interceptor/auth-error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

export const AuthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        snackBar.open('No autorizado. Por favor, inicia sesión nuevamente.', 'Cerrar', {
          duration: 3000,
        });
        router.navigate(['/auth/login']);
      } else {
        snackBar.open(`Error: ${error.message}`, 'Cerrar', {
          duration: 3000,
        });
      }
      return throwError(() => error);
    })
  );
};
