import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvitacionService } from '../../../core/service/invitacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '../../../core/service/plan.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
@Component({
  selector: 'app-invite-students',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {
// In TutorLayoutComponent or wherever your sidebar logic is
sections = [
  { name: 'cursos', label: 'Cursos', link: '/dashboard-tutor/cursos', icon: 'fas fa-book' },
  { name: 'invitar-estudiantes', label: 'Invitar', link: '/dashboard-tutor/invitar-estudiantes', icon: 'fas fa-user-plus' },
  { name: 'perfil', label: 'Perfil', link: '/dashboard-tutor/perfil', icon: 'fas fa-user' },
];

cursos = [
  { nombre: 'Curso 1', descripcion: 'Aprende los fundamentos de Angular.', imagen: 'assets/images/curso1.jpg', ciclo: 1 },
  { nombre: 'Curso 2', descripcion: 'Conoce conceptos avanzados de Java.', imagen: 'assets/images/curso2.jpg', ciclo: 2 },
  { nombre: 'Curso 3', descripcion: 'Crea aplicaciones con Spring Boot.', imagen: 'assets/images/curso3.jpg', ciclo: 3 },
  { nombre: 'Curso 4', descripcion: 'Introducción a bases de datos SQL.', imagen: 'assets/images/curso4.jpg', ciclo: 1 },
  { nombre: 'Curso 5', descripcion: 'Dominando Python para Machine Learning.', imagen: 'assets/images/curso5.jpg', ciclo: 4 },
  { nombre: 'Curso 6', descripcion: 'Desarrollo web con React.', imagen: 'assets/images/curso6.jpg', ciclo: 2 },
];

  isCollapsed: boolean = false;
  activeSection: string = 'dashboard';

  constructor(
    private fb: FormBuilder,
    private invitacionService: InvitacionService,
    private snackBar: MatSnackBar,
    private planService: PlanService,
    private authService: AuthService,
    private router: Router, 

  ) {}
  
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  setActive(section: string) {
    this.activeSection = section;
  }

  verCurso(curso: any): void {
    // Implementa la lógica para ver detalles del curso
  }

}
