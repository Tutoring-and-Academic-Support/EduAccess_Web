import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})

export class DashboardStudentComponent implements OnInit {
  isCollapsed: boolean = false;
  activeSection: string = 'dashboard';

  cursos = [
    { nombre: 'Curso 1', descripcion: 'Aprende los fundamentos de Angular.', imagen: 'assets/images/curso1.jpg', ciclo: 1 },
    { nombre: 'Curso 2', descripcion: 'Conoce conceptos avanzados de Java.', imagen: 'assets/images/curso2.jpg', ciclo: 2 },
    { nombre: 'Curso 3', descripcion: 'Crea aplicaciones con Spring Boot.', imagen: 'assets/images/curso3.jpg', ciclo: 3 },
    { nombre: 'Curso 4', descripcion: 'Introducción a bases de datos SQL.', imagen: 'assets/images/curso4.jpg', ciclo: 1 },
    { nombre: 'Curso 5', descripcion: 'Dominando Python para Machine Learning.', imagen: 'assets/images/curso5.jpg', ciclo: 4 },
    { nombre: 'Curso 6', descripcion: 'Desarrollo web con React.', imagen: 'assets/images/curso6.jpg', ciclo: 2 },
  ];

  cursosFiltrados = [...this.cursos];

  sections = [
    { name: 'student-dashboard', label: 'Cursos', link: '/dashboard/inicio', icon: 'fas fa-book' },
    { name: 'settings', label: 'Ajustes', link: '/settings', icon: 'fas fa-cog' },
    { name: 'profile', label: 'Perfil', link: '/profile', icon: 'fas fa-user' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


  setActive(section: string) {
    this.activeSection = section;
  }

  verCurso(curso: any) {
    this.snackBar.open(`Curso seleccionado: ${curso.nombre}`, 'Cerrar', { duration: 2000 });
  }

  //filtro de cursos
  /*filtrarCursosPorCiclo(ciclo: string) {
    if (ciclo) {
      this.cursosFiltrados = this.cursos.filter(curso => curso.ciclo === parseInt(ciclo));
    } else {
      this.cursosFiltrados = [...this.cursos]; // Si no hay ciclo seleccionado, muestra todos los cursos
    }
  }

  buscarCurso(termino: string) {
    this.cursosFiltrados = this.cursos.filter(curso =>
      curso.nombre.toLowerCase().includes(termino.toLowerCase())
    );
  }*/

    filtrarCursosPorCiclo(event: Event) {
      const selectElement = event.target as HTMLSelectElement; // Asegura que es un <select>
      const ciclo = selectElement.value;
    
      if (ciclo) {
        this.cursosFiltrados = this.cursos.filter(curso => curso.ciclo === parseInt(ciclo, 10));
      } else {
        this.cursosFiltrados = [...this.cursos]; // Si no hay ciclo seleccionado, muestra todos los cursos
      }
    }
    
    buscarCurso(event: Event) {
      const inputElement = event.target as HTMLInputElement; // Asegura que es un <input>
      const termino = inputElement.value;
    
      this.cursosFiltrados = this.cursos.filter(curso =>
        curso.nombre.toLowerCase().includes(termino.toLowerCase())
      );
    }
    
}