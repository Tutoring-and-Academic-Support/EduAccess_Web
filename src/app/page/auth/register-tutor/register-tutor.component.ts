/*

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { RegisterTutorRequest } from '../../../shared/model/register-request.model';
import { RegisterTutorResponse } from '../../../shared/model/register-response.model';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.component.html',
  styleUrls: ['./register-tutor.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
    CommonModule
    // Importa otros módulos si es necesario
  ]
})
export class RegisterTutorComponent {

  registerForm: FormGroup;
  private fb = inject(FormBuilder);
  public router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  constructor() {
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
      departamento: ['', Validators.required]  // Plan de suscripción
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const tutorData: RegisterTutorRequest = {
        nombre: this.registerForm.value.nombre,
        apellidos: this.registerForm.value.apellidos,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        departamento: this.registerForm.value.departamento // Asegúrate de que este campo coincide con el backend
      };

      this.authService.registerTutor(tutorData).subscribe({
        next: (response: RegisterTutorResponse) => {
          this.showSnackBar('Registro exitoso. Redirigiendo a la página de inicio de sesión.');
          this.router.navigate(['/auth/login']); // Navegar a la ruta raíz que muestra LoginComponent
        },
        error: (error) => {
          this.showSnackBar(error.error ? error.error : 'Error al registrar. Inténtalo de nuevo.');
        }
      });
    } else {
      this.showSnackBar('Por favor, complete todos los campos correctamente.');
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
}

}*/

// src/app/page/auth/register-tutor/register-tutor.component.ts
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
          this.snackBar.open('Registro exitoso. Redirigiendo al inicio de sesión.', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/auth/login']);
          this.isSubmitting = false;
        },
        error: (error) => {
          this.snackBar.open('Error al registrar: ' + (error.error || 'Inténtalo de nuevo.'), 'Cerrar', {
            duration: 5000
          });
          this.isSubmitting = false;
        }
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {
        duration: 3000
      });
    }
  }
}
