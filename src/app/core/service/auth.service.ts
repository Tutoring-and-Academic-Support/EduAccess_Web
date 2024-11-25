/*// src/app/core/service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../shared/model/auth-response.model';
import { StorageService } from './storage.service';
import { RegisterTutorRequest } from '../../shared/model/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = `${environment.baseURL}/auth`;
  private api_dos_URL = `${environment.baseURL}/registrar`;
  
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  // verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const authData = this.storageService.getAuthData();
    return authData !== null && !!authData.token;
  }
  

  // metodo de login
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/login`, { email, password });
  }

  // Método de registro para el tutor
  registerTutor(tutorData: any): Observable<any> {
    return this.http.post(`${this.api_dos_URL}/tutor`, tutorData, {  responseType: 'text'  });
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
}*/
// src/app/core/service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../shared/model/auth-response.model';
import { StorageService } from './storage.service';
import { RegisterTutorRequest } from '../../shared/model/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = `${environment.baseURL}/auth`;
  private api_dos_URL = `${environment.baseURL}/registrar`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  // Verifica si el usuario está autenticado y si el token es válido
  /*isAuthenticated(): boolean {
    const authData = this.storageService.getAuthData();
    if (authData && authData.token) {
      return !this.isTokenExpired(authData.token);
    }
    return false;
  }*/

    // src/app/core/service/auth.service.ts
isAuthenticated(): boolean {
  const authData = this.storageService.getAuthData();
  console.log('AuthService - authData:', authData);
  if (authData && authData.token) {
    const isExpired = this.isTokenExpired(authData.token);
    console.log('AuthService - isTokenExpired:', isExpired);
    return !isExpired;
  }
  return false;
}


  // Decodifica el token y verifica su expiración
  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const expirationDate = decoded.exp * 1000; // exp está en segundos
      return Date.now() > expirationDate;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return true;
    }
  }

 // Método de registro para el tutor
  registerTutor(tutorData: any): Observable<any> {
    return this.http.post(`${this.api_dos_URL}/tutor`, tutorData, { responseType: 'text' });
  }

  // Almacenar los datos de autenticación
  saveAuthData(data: AuthResponse): void {
    this.storageService.setAuthData(data);
  }

  // Obtener el rol del usuario
  getUserRole(): string | null {
    return this.storageService.getAuthData()?.role || null;
  }
  // src/app/core/service/auth.service.ts
getUserId(): number | null {
  const authData = this.storageService.getAuthData();
  if (authData && authData.token) {
    try {
      const decoded: any = jwtDecode(authData.token);
      return decoded.id || null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  return null;
}


  // Logout
  logout(): void {
    this.storageService.clearAuthData();
  }

  // Método de login
  login(email: string, password: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiURL}/login`, { email, password });
  }
  
}
