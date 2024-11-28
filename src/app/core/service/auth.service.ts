// src/app/core/service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../shared/model/auth-response.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = `${environment.baseURL}/auth`;
  private api_URL = `${environment.baseURL}/registrar`;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  // verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.storageService.getAuthData()?.token;
  }

  // metodo de login
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/login`, { email, password });
  }

  // Método de registro para el tutor
  registerTutor(tutorData: any): Observable<any> {
    return this.http.post(`${this.api_URL}/tutor`, tutorData);
  }

  // Almacenar los datos de autenticación
  saveAuthData(data: AuthResponse): void {
    this.storageService.setAuthData(data);
  }

  // Obtener el rol del usuario
  getUserRole(): string | null {
    return this.storageService.getAuthData()?.role || null;
  }

  // Logout
  logout(): void {
    this.storageService.clearAuthData();
  }
}

