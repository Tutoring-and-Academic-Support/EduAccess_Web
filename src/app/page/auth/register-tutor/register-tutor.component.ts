import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterTutorRequest } from '../../../shared/model/register-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.component.html',
  styleUrls: ['./register-tutor.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
})
export class RegisterTutorComponent {
  registerForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    protected router: Router,
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      departamento: ['', Validators.required],
      role: ['TUTOR'],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      const tutorData: RegisterTutorRequest = this.registerForm.value;
      console.log('Datos enviados al backend:', tutorData);

      this.authService.registerTutor(tutorData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          // Mostrar mensaje de registro exitoso y redirigir al login
          this.snackBar
            .open('Registro exitoso. Por favor, inicia sesión.', 'Cerrar', {
              duration: 5000,
            })
            .afterDismissed()
            .subscribe(() => {
              this.router.navigate(['/auth/login'], {
                queryParams: { registered: 'true' },
              });
            });
        },
        error: (error) => {
          console.log('Error al registrar:', error);
          this.isSubmitting = false;
          let errorMessage = 'Inténtalo de nuevo.';
          if (error.status === 400) {
            if (error.error && typeof error.error === 'object') {
              // Si el error es un objeto con detalles de validación
              errorMessage = Object.values(error.error).join(' ');
            } else {
              errorMessage = error.error || 'Solicitud inválida.';
            }
          } else if (error.status === 500) {
            errorMessage = 'Error interno del servidor.';
          }
          this.snackBar.open('Error al registrar: ' + errorMessage, 'Cerrar', {
            duration: 5000,
          });
        },
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
