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
  selector: 'app-invite-students',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit{



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
        this.cursos = cursos;
        console.log('Cursos cargados:', this.cursos); // Para depuración
        this.applyFilter();
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
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

  onCicloChange(): void {
    this.applyFilter();
  }

  verCurso(curso: Curso): void {
    this.router.navigate(['/dashboard-tutor/cursos', curso.id]);
  }
}
