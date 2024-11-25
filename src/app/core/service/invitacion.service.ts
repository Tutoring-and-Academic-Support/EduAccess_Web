import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvitacionService {
  private apiURL = `${environment.baseURL}/registrar`;

  constructor(private http: HttpClient) {}

  enviarInvitaciones(correos: string[]) {
    return this.http.post(`${this.apiURL}/invitaciones`, { correos });
  }
}
