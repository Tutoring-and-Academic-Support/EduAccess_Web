// src/app/page/register-student/register-student.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { InvitacionService } from '../../../core/service/invitacion.service';
import { RegisterStudentRequest } from '../../../shared/model/register-student-request.model'; // Importa la interface

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    CommonModule
  ],
})
export class RegisterStudentComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitting: boolean = false;
  isTokenValid: boolean = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService, // Servicio de autenticación general
    private invitacionService: InvitacionService, // Servicio para manejar invitaciones
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      apellidos: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=\\-{};\'":\\\\|,.<>\\/?]).{8,}$'
          ),
        ],
      ],
      ciclo: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
    });
  }

  ngOnInit(): void {
    // Extraer el token de los parámetros de consulta
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.validarToken(this.token);
      } else {
        this.isTokenValid = false;
        this.snackBar.open('Token de invitación no proporcionado.', 'Cerrar', { duration: 5000 });
      }
    });
  }

  validarToken(token: string): void {
    this.invitacionService.completarRegistro(token).subscribe({
      next: (response) => {
        console.log('Token Response:', response);
        if (response.status === 'success') {
          this.isTokenValid = true;
        } else {
          this.isTokenValid = false;
          this.snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        }
      },
      error: (error) => {
        this.isTokenValid = false;
        this.snackBar.open('Token inválido o expirado.', 'Cerrar', { duration: 5000 });
      }
    });
  }
  

 onSubmit(): void {
    if (this.registerForm.valid && this.token) {
      this.isSubmitting = true;
      const registroData: RegisterStudentRequest = {
        ...this.registerForm.value,
        ciclo: Number(this.registerForm.value.ciclo),
        role: 'ESTUDIANTE', // Asigna el rol directamente
      };

      this.authService.registroEstudiante(registroData, this.token).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackBar.open('Registro exitoso. Iniciando sesión...', 'Cerrar', { duration: 3000 });
          // Autenticación automática
          this.authService.login(registroData.email, registroData.password).subscribe({
            next: (response) => {
              this.authService.saveAuthData(response);
              const userRole = response.role;
              this.router.navigate(
                userRole === 'ESTUDIANTE'
                  ? ['/auth/login']
                  : ['/']
              );
            },
            error: () => {
              this.snackBar.open('Error al iniciar sesión.', 'Cerrar', { duration: 5000 });
              this.router.navigate(['/auth/login']);
            }
          });
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open(`Error al registrarse: ${error.error?.message || 'Inténtalo de nuevo.'}`, 'Cerrar', { duration: 5000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', { duration: 3000 });
    }
  }
}
