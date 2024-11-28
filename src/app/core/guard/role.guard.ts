// src/app/core/guards/role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      
    const expectedRoles: string[] = route.data['roles'];
    const userRole: string | null = this.authService.getUserRole();

    if (!userRole) {
      // No hay rol asignado, redirigir al login
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (expectedRoles.includes(userRole)) {
      return true;
    } else {
      // Rol no autorizado, redirigir a página de acceso denegado
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}
