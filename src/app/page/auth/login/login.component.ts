// src/app/page/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthResponse } from '../../../shared/model/auth-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response: AuthResponse) => {
          // Almacena los datos de autenticación
          this.authService.saveAuthData(response);

          // Redirige al dashboard según el rol
          if (response.role === 'TUTOR') {
            this.router.navigate(['/dashboard']);
          } else if (response.role === 'ESTUDIANTE') {
            this.router.navigate(['/student-dashboard']);
          } else {
            this.router.navigate(['/']); // O una ruta por defecto
          }

          this.isSubmitting = false;
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open('Error al iniciar sesión: ' + (error.error || 'Inténtalo de nuevo.'), 'Cerrar', {
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