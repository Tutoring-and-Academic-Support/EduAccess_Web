export interface RegisterStudentRequest {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    ciclo: number;
    role: string; // Opcional, puede ser gestionado en el backend
  }