
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AnimationOptions } from 'ngx-lottie';
import { LottieComponent } from 'ngx-lottie';

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
    LottieComponent
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isSubmitting: boolean = false;
  currentView: 'login' | 'register' = 'login'; // Cambia entre 'login' y 'register'

  options: AnimationOptions={
    path: 'assets/animation/Animation-login.json'
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    protected router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
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
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Mensaje tras registro exitoso
    this.route.queryParams.subscribe((params) => {
      if (params['registered'] === 'true') {
        this.snackBar.open(
          'Registro exitoso. Por favor, inicia sesión.',
          'Cerrar',
          { duration: 5000 }
        );
      }
    });
  }

  toggleView(): void {
    this.currentView = this.currentView === 'login' ? 'register' : 'login';
  }

  onSubmit(): void {
    if (this.currentView === 'login' && this.loginForm.valid) {
      this.login();
    } else if (this.currentView === 'register' && this.registerForm.valid) {
      this.register();
    } else {
      this.snackBar.open(
        'Por favor, completa todos los campos correctamente.',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }

  private login(): void {
    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.authService.saveAuthData(response);
        this.snackBar
          .open('Inicio de sesión exitoso.', 'Cerrar', { duration: 3000 })
          .afterDismissed()
          .subscribe(() => {
            const userRole = response.role;
            if (userRole === 'TUTOR') {
              if (this.authService.isPaymentComplete()) {
                this.router.navigate(['/dashboard-tutor/cursos']);
              } else {
                this.router.navigate(['/dashboard-tutor']);
              }
            } else if (userRole === 'ESTUDIANTE') {
              this.router.navigate(['/student-dashboard']);
            } else {
              this.router.navigate(['/']);
            }
          });
      },
      error: (error) => {
        this.isSubmitting = false;
        this.snackBar.open(
          `Error al iniciar sesión: ${error.error?.message || 'Inténtalo de nuevo.'}`,
          'Cerrar',
          { duration: 5000 }
        );
      },
    });
  }

  private register(): void {
    this.isSubmitting = true;
    const registerData = this.registerForm.value;

    this.authService.registerTutor(registerData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.snackBar
          .open('Registro exitoso. Por favor, inicia sesión.', 'Cerrar', {
            duration: 5000,
          })
          .afterDismissed()
          .subscribe(() => {
            this.toggleView();
          });
      },
      error: (error) => {
        this.isSubmitting = false;
        const errorMessage =
          error.status === 400
            ? error.error || 'Solicitud inválida.'
            : 'Error interno del servidor.';
        this.snackBar.open(
          `Error al registrarse: ${errorMessage}`,
          'Cerrar',
          { duration: 5000 }
        );
      },
    });
  }
}
