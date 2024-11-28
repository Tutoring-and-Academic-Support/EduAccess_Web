/*src/app/core/guard/auth-inverse.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInverseGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Si el usuario ya está autenticado, redirígelo al dashboard o a la página principal
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']); // O la ruta que quieras redirigir
      return false;
    } else {
      return true; // Permite acceso a login o registro si no está autenticado
    }
  }
}*/

// src/app/core/guard/auth-inverse.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInverseGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole();
      if (userRole === 'TUTOR') {
        this.router.navigate(['/dashboard']);
      } else if (userRole === 'ESTUDIANTE') {
        this.router.navigate(['/student-dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
      return false;
    }
    return true;
  }
}

