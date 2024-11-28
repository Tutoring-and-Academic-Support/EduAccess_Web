import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from '../../../shared/model/plan-response.model';
import { PlanService } from '../../../core/service/plan.service';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import {  RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard-tutor',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard-tutor.component.html',
  styleUrls: ['./dashboard-tutor.component.scss']
})
export class DashboardTutorComponent implements OnInit {
  plans: Plan[] = [];

  constructor(
    private router: Router,
    private planService: PlanService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  
  //planes
  loadPlans() {
    this.planService.getPlans().subscribe(
      (plans) => {
        console.log('Planes cargados:', plans); // Verifica que los datos lleguen
        this.plans = plans;
      },
      (error) => {
        console.error('Error al obtener los planes:', error);
      }
    );
  }
  

  selectPlan(plan: Plan) {
    this.planService.payPlan(plan.idPlan).subscribe(
      (approvalUrl) => {
        // Redirigir al tutor a la URL de aprobación de PayPal
        window.location.href = approvalUrl;
      },
      (error) => {
        console.error('Error al iniciar el pago:', error);
      }
    );
  }

  getPlans(): void {
    this.http.get(`http://localhost:8080/plan`)
      .subscribe({
        next: (plans: any) => {
          console.log('Planes:', plans);
          this.plans = plans;
        },
        error: (error) => {
          console.error('Error al obtener los planes:', error);
          // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
        }
      });
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

