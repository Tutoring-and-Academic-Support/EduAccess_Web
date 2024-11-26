// src/app/core/guard/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const expectedRole = route.data['expectedRole'];
      const userRole = this.authService.getUserRole();

      if (expectedRole && userRole !== expectedRole) {
        this.snackBar.open('No tienes permisos para acceder a esta sección.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}