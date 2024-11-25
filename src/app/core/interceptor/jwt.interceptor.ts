// src/app/core/interceptor/jwt.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../service/storage.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authData = storageService.getAuthData();
  console.log('JWT Interceptor - Auth Data:', authData);

  if (authData && authData.token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authData.token}`,
      },
    });
    console.log('JWT Interceptor - Authorization header added.');
    return next(authReq);
  }

  console.log('JWT Interceptor - No Authorization header added.');
  return next(req);
};
