import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvitacionService } from '../../../core/service/invitacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanService } from '../../../core/service/plan.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invite-students',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './invite-students.component.html',
  styleUrls: ['./invite-students.component.scss']
})

export class InviteStudentsComponent implements OnInit {
  inviteForm: FormGroup;
  maxStudents: number = 0;
  students: { name: string; gender: string; email: string }[] = []; // Lista de estudiantes

  constructor(
    private fb: FormBuilder,
    private invitacionService: InvitacionService,
    private snackBar: MatSnackBar,
    private planService: PlanService
  ) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Cambié de "emails" a "email" porque es un solo campo en el formulario actual
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

  
  // Barra lateral
  sidebarOpen = true;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
