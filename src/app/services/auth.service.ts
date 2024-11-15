import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = { email: 'xvUd1@example.com', name: 'John Doe', id: 123, role: 'estudiante' , studentId: '1'}; // Este objeto debería provenir de un JWT o un servicio de sesión

  constructor() {}

  // Método para obtener el usuario autenticado (simulado aquí)
  getUser() {
    return this.user;
  }

  // Este método se usaría para actualizar el usuario autenticado
  setUser(user: any) {
    this.user = user;
  }
}
