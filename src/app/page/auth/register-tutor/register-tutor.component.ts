import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterTutorRequest } from '../../../shared/model/register-request.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.component.html',
  styleUrls: ['./register-tutor.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
          )
        ]
      ],
      departamento: ['', Validators.required],
      role: ['TUTOR']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      const tutorData: RegisterTutorRequest = this.registerForm.value;

      this.authService.registerTutor(tutorData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.snackBar.open('Registro exitoso. Redirigiendo al inicio de sesión.', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/auth/login']); // Redirige al login
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open('Error al registrar: ' + (error.error || 'Inténtalo de nuevo.'), 'Cerrar', {
            duration: 5000
          });
        }
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {
        duration: 3000
      });
    }
  }
}
