import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitacionService {
  private apiURL = `${environment.baseURL}/registrar`;

  constructor(private http: HttpClient) {}

  enviarInvitaciones(correos: string[]) {
    const payload = { correos };
    return this.http.post<{ message: string }>(`${this.apiURL}/invitaciones`, payload).pipe(
      catchError((error) => {
        console.error('Error al enviar invitaciones:', error);
        return throwError(() => new Error(error.error?.message || 'No se pudo enviar las invitaciones.'));
      })
    );
  }

  completarRegistro(token: string): Observable<{ status: string; message: string }> {
    return this.http.get<{ status: string; message: string }>(`${this.apiURL}/registro-completar`, {
      params: { token }
    }).pipe(
      catchError((error) => {
        console.error('Error al validar token:', error);
        return throwError(() => new Error(error.error?.message || 'No se pudo validar el token.'));
      })
    );
  }
  

}
