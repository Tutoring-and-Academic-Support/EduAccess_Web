import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../../../core/service/plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})

export class PaymentSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private planService: PlanService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  /*ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const idPlan = params['idPlan'];
      const PayerID = params['PayerID'];

      if (token && idPlan) {
        // Mostrar mensaje de éxito
        this.snackBar.open('Pago realizado con éxito. Ahora puedes invitar a tus estudiantes.', 'Cerrar', {
          duration: 5000,
        });
        // Guardar el plan adquirido en el almacenamiento local o en un servicio
        localStorage.setItem('planAdquirido', idPlan);
        this.router.navigate(['/invitar-estudiantes']);
      } else {
        this.snackBar.open('Parámetros inválidos.', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/dashboard']);
      }
    });
  }*/
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const token = params['token']; // orderId
  
        if (token) {
          const idPlan = localStorage.getItem('planAdquirido');
          if (token) {
            this.planService.captureOrder(token).subscribe({
              next: (response) => {
                this.snackBar.open('Pago exitoso. ¡Gracias!', 'Cerrar', { duration: 3000 });
                this.router.navigate(['/invitar-estudiantes']);
              },
              error: (error) => {
                console.error('Error al capturar el pago:', error);
                this.snackBar.open('Error al procesar el pago. Por favor, inténtalo de nuevo.', 'Cerrar', { duration: 3000 });
                this.router.navigate(['/dashboard']);
              }
            });
          } else {
            this.snackBar.open('Información de pago incompleta.', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.snackBar.open('Información de pago incompleta.', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/dashboard']);
        }
      });
    }

}