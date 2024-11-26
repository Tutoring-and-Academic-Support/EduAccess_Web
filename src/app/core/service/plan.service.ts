// src/app/core/service/plan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Plan {
  idPlan: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  cantidadEstudiantes: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private planURL = `${environment.baseURL}/plan`; // Ajusta la URL según tu configuración
  private paypalURL = `${environment.baseURL}/paypal`;

  constructor(private http: HttpClient) {}

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.planURL}`);
  }

  getPlanById(idPlan: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.planURL}/${idPlan}`);
  }
  

 // plan.service.ts

payPlan(idPlan: number): Observable<string> {
  localStorage.setItem('planAdquirido', idPlan.toString());
  return this.http.post(`${this.planURL}/${idPlan}/pagar`, null, { responseType: 'text' });
}

  

captureOrder(token: string): Observable<any> {
  return this.http.post(`${this.paypalURL}/capture-order`, { token }, { responseType: 'text' });
}
  
}
