import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlanService } from '../../../core/service/plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})

export class PaymentSuccessComponent implements OnInit {
  private token: string | null = null; // Variable de clase para almacenar el token

  constructor(
    private route: ActivatedRoute,
    private planService: PlanService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  /*  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        const token = params['token']; // orderId
  
        if (token) {
          const idPlan = localStorage.getItem('planAdquirido');
          if (token) {
            this.planService.captureOrder(token).subscribe({
              next: (response) => {
                this.snackBar.open('Pago exitoso. ¡Gracias!', 'Cerrar', { duration: 3000 });
                //this.router.navigate(['/invitar-estudiantes']);
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
    }*/
      ngOnInit(): void {
        // Captura el token desde los parámetros de la URL
        this.route.queryParams.subscribe(params => {
          this.token = params['token']; // Almacena el token en la variable de clase
    
          if (this.token) {
            const idPlan = localStorage.getItem('planAdquirido'); // Obtener idPlan desde el localStorage
            if (idPlan) {
              // Capturar el pago
              this.planService.captureOrder(this.token).subscribe({
                next: () => {
                  this.snackBar.open('Pago exitoso. ¡Gracias!', 'Cerrar', { duration: 3000 });
                  // No redirigir automáticamente
                },
                error: (error) => {
                  console.error('Error al capturar el pago:', error);
                  this.snackBar.open('Error al procesar el pago. Por favor, inténtalo de nuevo.', 'Cerrar', { duration: 3000 });
                }
              });
            } else {
              this.snackBar.open('No se encontró información del plan adquirido.', 'Cerrar', { duration: 3000 });
            }
          } else {
            this.snackBar.open('Información de pago incompleta.', 'Cerrar', { duration: 3000 });
          }
        });
      }
    
      redirectToInvite(): void {
        if (this.token) {
          this.router.navigate(['/invitar-estudiantes']);
        } else {
          this.snackBar.open('No se puede redirigir. Información de pago incompleta.', 'Cerrar', { duration: 3000 });
        }
      }
      
}
