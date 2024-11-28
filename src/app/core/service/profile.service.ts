import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../../shared/model/user-profile.model'; // Importa desde shared/model
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.baseURL}/profile`; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) { }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl);
  }
}
