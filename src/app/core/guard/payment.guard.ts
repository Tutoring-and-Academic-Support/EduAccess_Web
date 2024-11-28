// src/app/core/guard/payment.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isPaymentComplete()) {
      return true;
    } else {
      // Redirigir al dashboard principal con los planes
      this.router.navigate(['/dashboard-tutor']);
      return false;
    }
  }
}
