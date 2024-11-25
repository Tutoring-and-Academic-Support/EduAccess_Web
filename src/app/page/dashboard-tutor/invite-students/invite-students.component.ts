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

  constructor(
    private fb: FormBuilder,
    private invitacionService: InvitacionService,
    private snackBar: MatSnackBar,
    private planService: PlanService
  ) {
    this.inviteForm = this.fb.group({
      emails: this.fb.array([]),
    });
  }

  ngOnInit() {
    // Obtener el plan adquirido del almacenamiento local
    const idPlan = localStorage.getItem('planAdquirido');
    if (idPlan) {
      this.planService.getPlanById(+idPlan).subscribe(
        (plan) => {
          this.maxStudents = plan.cantidadEstudiantes; // Asegúrate de que el Plan tiene este campo
          this.addEmailField(); // Agregar un campo inicial
        },
        (error) => {
          this.snackBar.open('Error al obtener información del plan.', 'Cerrar', { duration: 3000 });
          // Redirigir o manejar el error
        }
      );
    } else {
      this.snackBar.open('No se encontró información del plan adquirido.', 'Cerrar', { duration: 3000 });
      // Redirigir al dashboard
    }
  }

  get emails(): FormArray {
    return this.inviteForm.get('emails') as FormArray;
  }

  addEmailField() {
    if (this.emails.length < this.maxStudents) {
      this.emails.push(this.fb.control('', [Validators.required, Validators.email]));
    } else {
      this.snackBar.open('Has alcanzado el número máximo de estudiantes.', 'Cerrar', { duration: 3000 });
    }
  }

  removeEmailField(index: number) {
    this.emails.removeAt(index);
  }

  onSubmit() {
    if (this.inviteForm.valid) {
      const emailList = this.inviteForm.value.emails;
      this.invitacionService.enviarInvitaciones(emailList).subscribe(
        (response) => {
          this.snackBar.open('Invitaciones enviadas con éxito.', 'Cerrar', { duration: 3000 });
          // Limpiar el formulario o redirigir a otra página
        },
        (error) => {
          this.snackBar.open('Error al enviar invitaciones.', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Por favor, corrige los errores en el formulario.', 'Cerrar', { duration: 3000 });
    }
  }
}