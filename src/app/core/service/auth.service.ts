/*import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../shared/model/auth-response.model';
import { AuthRequest } from '../../shared/model/auth-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //nombre del controller de la ruta base authController
  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  //endpoints del controller
  constructor() { }

  login(authRequest: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(
      tap(response => this.storageService.setAuthData(response))
    )
  }
/*
  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseURL}/registrar/tutor`, registerRequest);
  }

  logout(): void {
    this.storageService.clearAuthData();
  }

  isAuthenticated(): boolean{
    return this.storageService.getAuthData() !== null;
  }

  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }
}*/


/*import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../shared/model/auth-response.model';
import { AuthRequest } from '../../shared/model/auth-request.model';
import { RegisterTutorRequest } from '../../shared/model/register-request.model'; 
import { RegisterTutorResponse } from '../../shared/model/register-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Nombre del controlador de la ruta base authController
  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  // Endpoints del controlador
  constructor() { }

  // Método para iniciar sesión
  login(authRequest: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(
      tap(response => this.storageService.setAuthData(response))
    )
  }

  /*
    Método para registrar un usuario (tutor o estudiante)
    Actualmente comentado, se debe implementar para manejar el registro de tutores
    register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
      return this.http.post<RegisterResponse>(`${this.baseURL}/registrar/tutor`, registerRequest);
    }
  */
/*
  // Método para cerrar sesión
  logout(): void {
    this.storageService.clearAuthData();
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean{
    return this.storageService.getAuthData() !== null;
  }

  // Obtiene los datos del usuario autenticado
  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }

  // Método adicional necesario para registrar tutores
  registerTutor(registerTutorRequest: RegisterTutorRequest): Observable<RegisterTutorResponse> {
    return this.http.post<RegisterTutorResponse>(`${this.baseURL}/registrar/tutor`, registerTutorRequest);
  }*/
/*
  // Método adicional para registrar estudiantes si es necesario
  registerEstudiante(registerEstudianteRequest: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/registrar/estudiante`, registerEstudianteRequest);
  }
}*/

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

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.storageService.getAuthData()?.token;
  }

  // Método de login
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/login`, { email, password });
  }

  // Método de registro para el tutor
  registerTutor(tutorData: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/registrar/tutor`, tutorData);
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

