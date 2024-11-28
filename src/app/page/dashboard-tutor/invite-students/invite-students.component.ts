/*import { Component, OnInit } from '@angular/core';
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
  templateUrl: './invite-students.component.html',
  styleUrls: ['./invite-students.component.scss']
})

export class InviteStudentsComponent implements OnInit {
  inviteForm: FormGroup;
  maxStudents: number = 0;
  students: { name: string; gender: string; email: string }[] = []; // Lista de estudiantes

// In TutorLayoutComponent or wherever your sidebar logic is
sections = [
  { name: 'cursos', label: 'Cursos', link: '/dashboard-tutor/cursos', icon: 'fas fa-book' },
  { name: 'invitar-estudiantes', label: 'Invitar', link: '/dashboard-tutor/invitar-estudiantes', icon: 'fas fa-user-plus' },
  { name: 'perfil', label: 'Perfil', link: '/dashboard-tutor/perfil', icon: 'fas fa-user' },
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

  ) 
  {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Cambié de "emails" a "email" porque es un solo campo en el formulario actual
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  setActive(section: string) {
    this.activeSection = section;
  }

  ngOnInit() {
    const idPlan = localStorage.getItem('planAdquirido');
    if (idPlan) {
      this.planService.getPlanById(+idPlan).subscribe(
        (plan) => {
          this.maxStudents = plan.cantidadEstudiantes;
        },
        (error) => {
          this.snackBar.open('Error al obtener información del plan.', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('No se encontró información del plan adquirido.', 'Cerrar', { duration: 3000 });
    }
  }

  onSubmit() {
    if (this.inviteForm.valid) {
      const newStudent = {
        name: this.inviteForm.value.name,
        gender: this.inviteForm.value.gender,
        email: this.inviteForm.value.email,
      };

      // Agregar el estudiante a la lista
      this.students.push(newStudent);

      // Simular el envío del correo
      this.invitacionService.enviarInvitaciones([newStudent.email]).subscribe(
        () => {
          this.snackBar.open('Invitación enviada con éxito.', 'Cerrar', { duration: 3000 });
        },
        (error) => {
          this.snackBar.open('Error al enviar la invitación.', 'Cerrar', { duration: 3000 });
        }
      );

      // Limpiar el formulario
      this.inviteForm.reset();
    } else {
      this.snackBar.open('Por favor, corrige los errores en el formulario.', 'Cerrar', { duration: 3000 });
    }
  }

  
  logout(): void {
    this.authService.logout(); // Limpia el estado de autenticación
    this.router.navigate(['/auth/login']); // Redirige al login
  }

}*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvitacionService } from '../../../core/service/invitacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '../../../core/service/plan.service';
import { AuthService } from '../../../core/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invite-students',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './invite-students.component.html',
  styleUrls: ['./invite-students.component.scss']
})
export class InviteStudentsComponent implements OnInit {
  inviteForm: FormGroup;
  maxStudents: number = 0;
  students: { name: string; gender: string; email: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private invitacionService: InvitacionService,
    private snackBar: MatSnackBar,
    private planService: PlanService,
    public authService: AuthService, // Declarar como público
    private router: Router
  ) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit() {
    const idPlan = localStorage.getItem('planAdquirido');
    if (idPlan) {
      this.planService.getPlanById(+idPlan).subscribe(
        (plan) => {
          this.maxStudents = plan.cantidadEstudiantes;
        },
        (error) => {
          this.snackBar.open('Error al obtener información del plan.', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('No se encontró información del plan adquirido.', 'Cerrar', { duration: 3000 });
    }
  }

  onSubmit() {
    if (this.inviteForm.valid) {
      const newStudent = {
        name: this.inviteForm.value.name,
        gender: this.inviteForm.value.gender,
        email: this.inviteForm.value.email,
      };

      if (this.students.length >= this.maxStudents) {
        this.snackBar.open('Has alcanzado el número máximo de estudiantes.', 'Cerrar', { duration: 3000 });
        return;
      }

      this.students.push(newStudent);

      this.invitacionService.enviarInvitaciones([newStudent.email]).subscribe(
        () => {
          this.snackBar.open('Invitación enviada con éxito.', 'Cerrar', { duration: 3000 });
        },
        (error) => {
          this.snackBar.open('Error al enviar la invitación.', 'Cerrar', { duration: 3000 });
        }
      );

      this.inviteForm.reset();
    } else {
      this.snackBar.open('Por favor, corrige los errores en el formulario.', 'Cerrar', { duration: 3000 });
    }
  }
}

