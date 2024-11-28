// src/app/core/service/storage.service.ts
import { Injectable } from '@angular/core';
import { AuthResponse } from '../../shared/model/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private authKey = 'eduaccess_auth';

  constructor() {}

  // Almacena los datos de autenticación en el almacenamiento local
  setAuthData(data: AuthResponse): void {
    localStorage.setItem(this.authKey, JSON.stringify(data));
  }

  // Obtiene los datos de autenticación desde el almacenamiento local
  /*getAuthData(): AuthResponse | null {
    const data = localStorage.getItem(this.authKey);
    return data ? JSON.parse(data) as AuthResponse : null;
  }*/

  getAuthData(): AuthResponse | null {
  const data = localStorage.getItem(this.authKey);
  console.log('StorageService - getAuthData:', data);
  return data ? JSON.parse(data) as AuthResponse : null;
}


  // Limpia los datos de autenticación del almacenamiento local
  clearAuthData(): void {
    localStorage.removeItem(this.authKey);
  }
}