import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../../../app/shared/model/curso.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private baseUrl = `${environment.baseURL}/api/cursos`;

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}`);
  }

  getCursosByCiclo(ciclo: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/ciclo/${ciclo}`);
  }

  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.baseUrl}/${id}`);
  }
}
