// src/app/core/service/payment-status.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentStatusService {
  private paymentStatus = new BehaviorSubject<boolean>(false); // Estado inicial: no pagado

  // Observable para suscribirse a cambios
  paymentStatus$ = this.paymentStatus.asObservable();

  // Método para actualizar el estado
  updatePaymentStatus(status: boolean): void {
    this.paymentStatus.next(status);
  }
}
