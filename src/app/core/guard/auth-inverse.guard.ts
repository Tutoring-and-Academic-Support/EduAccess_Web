// auth-inverse.guard.ts
/*import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const userRole = authService.getUser()?.role;

    if (userRole === 'TUTOR') {
      router.navigate(['/tutor']);
    } else if (userRole === 'ESTUDIANTE') {
      router.navigate(['/student']);
    } else {
      router.navigate(['/home']);
    }

    return false;
  }

  return true;
};*/

// src/app/core/guard/auth-inverse.guard.ts
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
    // Si el usuario ya está autenticado, redirígelo al dashboard o a la página principal
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // O la ruta que quieras redirigir
      return false;
    } else {
      return true; // Permite acceso a login o registro si no está autenticado
    }
  }
}




