export interface Curso {
    id: number; // Identificador único del curso
    nombreCurso: string; // Nombre del curso
    descripcion: string; // Descripción detallada del curso
    estado: string; // Estado del curso (por ejemplo, PUBLICADO o NO_PUBLICADO)
    valoracion: number; // Valoración del curso
    ciclo: number; // Ciclo al que pertenece el curso
    imagen: string; // URL de la imagen asociada al curso
  }
  