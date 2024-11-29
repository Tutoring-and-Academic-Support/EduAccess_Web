import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InvitacionService } from '../../../core/service/invitacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '../../../core/service/plan.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { CursoService } from '../../../core/service/curso.service';
import { Curso } from '../../../shared/model/curso.model';
@Component({
  selector: 'app-cursos-student',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './cursos-student.component.html',
  styleUrl: './cursos-student.component.scss'
})
export class CursosStudentComponent {

  
cursos: Curso[] = []; // Tipado correcto
filteredCursos: Curso[] = []; // Tipar explícitamente como Curso[]
ciclos: number[] = [1, 2, 3, 4];
selectedCiclo = 0; // 0 significa 'Todos los ciclos'


  isCollapsed: boolean = false;
  activeSection: string = 'dashboard';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router, 
    private cursoService: CursoService,
    
  ) {}
  

  

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursoService.getCursos().subscribe(
      (cursos: Curso[]) => {
        // Asignar las imágenes a cada curso
        this.cursos = cursos.map(curso => ({
          ...curso,
          imagen: this.imagenesCursos[curso.id] || this.imagenPorDefecto
        }));
        console.log('Cursos cargados con imágenes asignadas:', this.cursos); // Para depuración
        this.applyFilter();
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
        // Opcional: Mostrar mensaje de error al usuario
      }
    );
  }

  applyFilter(): void {
    if (this.selectedCiclo === 0) {
      this.filteredCursos = this.cursos;
    } else {
      this.filteredCursos = this.cursos.filter(curso => curso.ciclo === this.selectedCiclo);
    }
    console.log('Cursos filtrados:', this.filteredCursos); // Para depuración
  }

   // Mapeo de IDs de cursos a URLs de imágenes
   private imagenesCursos: { [key: number]: string } = {
    1: 'https://www.unc.edu.pe/wp-content/uploads/2021/11/estudiantes_sistemas.png',
    2: 'https://www.tuproyectodevida.pe/wp-content/uploads/2021/08/sistemas-que-es-cursos-duracion-campo-laboral-especialidades-1200x628.jpg',
    3: 'https://usil-blog.s3.amazonaws.com/PROD/blog/image/que-es-ingenieria-de-sistemas.jpg',
    4: 'https://www.tuproyectodevida.pe/wp-content/uploads/2020/12/Ingeniería-de-Sistemas-1200x628.jpg',
    5: 'https://usil-blog.s3.amazonaws.com/PROD/blog/image/iStock-1321462048.jpg',
    6: 'https://pregrado.upc.edu.pe/facultad-de-ingenieria/ingenieria-de-sistemas-de-informacion/img/Certificaciones-para-tu-formación-profesional.jpg',
    7: 'https://pregrado.upc.edu.pe/facultad-de-ingenieria/ingenieria-de-sistemas-de-informacion/img/Malla-curricular-especializada.jpg',
    8: 'https://www.unc.edu.pe/wp-content/uploads/2021/11/estudiantes_sistemas.png',
    9: 'https://www.tuproyectodevida.pe/wp-content/uploads/2021/08/sistemas-que-es-cursos-duracion-campo-laboral-especialidades-1200x628.jpg',
    10: 'https://usil-blog.s3.amazonaws.com/PROD/blog/image/que-es-ingenieria-de-sistemas.jpg',
    11: 'https://www.tuproyectodevida.pe/wp-content/uploads/2020/12/Ingeniería-de-Sistemas-1200x628.jpg',
    12: 'https://usil-blog.s3.amazonaws.com/PROD/blog/image/iStock-1321462048.jpg',
    13: 'https://pregrado.upc.edu.pe/facultad-de-ingenieria/ingenieria-de-sistemas-de-informacion/img/Certificaciones-para-tu-formación-profesional.jpg',
    14: 'https://pregrado.upc.edu.pe/facultad-de-ingenieria/ingenieria-de-sistemas-de-informacion/img/Malla-curricular-especializada.jpg',
    15: 'https://pregrado.upc.edu.pe/facultad-de-ingenieria/ingenieria-de-sistemas-de-informacion/img/Egresados-exitosos.jpg'
    // Agrega más mapeos según tus cursos
  };

  // URL de imagen por defecto
  private imagenPorDefecto: string = 'https://via.placeholder.com/400x300?text=Imagen+No+Disponible';


  onCicloChange(): void {
    this.applyFilter();
  }

  verCurso(curso: Curso): void {
    this.router.navigate(['/dashboard-student/cursos', curso.id]);
  }

}
