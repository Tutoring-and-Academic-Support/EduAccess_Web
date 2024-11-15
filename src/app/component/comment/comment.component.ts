import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})

export class CommentComponent {
  comment = {
    content: ''
  };

  notification: string = '';
  error: string = '';

  // Suponemos que estos valores se obtienen de algún servicio
  estudianteId: number = 1;  // Este sería el ID del estudiante (debería obtenerse dinámicamente)
  materialId: number = 101;  // Este sería el ID del material (debería obtenerse dinámicamente)

  constructor(private http: HttpClient) {}

  submitComment(): void {
    const comentarioTexto = this.comment.content;

    // Llamar al endpoint para publicar el comentario
    this.http.post('/api/publicarEnMaterial',
      { estudianteId: this.estudianteId, materialId: this.materialId, comentarioTexto }
    ).subscribe(
      (response: any) => {
        // Manejo de la respuesta exitosa
        this.notification = 'Comentario publicado con éxito.';
        this.error = ''; // Limpiar errores previos
        this.comment.content = ''; // Limpiar el comentario
      },
      (error) => {
        // Manejo de errores
        this.error = 'Hubo un problema al publicar el comentario.';
        this.notification = ''; // Limpiar notificaciones previas
      }
    );
  }
}
