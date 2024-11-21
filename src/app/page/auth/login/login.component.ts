// src/app/page/auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthResponse } from '../../../shared/model/auth-response.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSnackBarModule, 
    MatProgressSpinnerModule, 
    ReactiveFormsModule,
  ],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    protected router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verificar si hay un parámetro de consulta indicando que el registro fue exitoso
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.snackBar.open('Registro exitoso. Por favor, inicia sesión.', 'Cerrar', {
          duration: 5000
        });
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe({
        next: (response: AuthResponse) => {
          this.isSubmitting = false;
          // Almacena los datos de autenticación
          this.authService.saveAuthData(response);
  
          // Mostrar mensaje de inicio de sesión exitoso y redirigir
          this.snackBar.open('Inicio de sesión exitoso.', 'Cerrar', {
            duration: 3000
          }).afterDismissed().subscribe(() => {
            // Redirige al dashboard según el rol
            const userRole = response.role;
            if (userRole === 'TUTOR') {
              this.router.navigate(['/dashboard']);
            } else if (userRole === 'ESTUDIANTE') {
              this.router.navigate(['/student-dashboard']);
            } else {
              this.router.navigate(['/']); // O a una ruta por defecto
            }
          });
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open('Error al iniciar sesión: ' + (error.error?.message || 'Inténtalo de nuevo.'), 'Cerrar', {
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