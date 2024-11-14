/*import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';

@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.component.html',
  styleUrl: './register-tutor.component.scss'
})
export class RegisterTutorComponent {

  registerForm: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);
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
      planSeleccionado: ['', Validators.required]  // Plan de suscripción
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const tutorData = this.registerForm.value;

      this.authService.registerTutor(tutorData).subscribe({
        next: () => {
          this.showSnackBar('Registro exitoso. Redirigiendo a la página de pago.');
          this.router.navigate(['/auth/login']);
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

/*import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';

@Component({
  selector: 'app-register-tutor',
  templateUrl: './register-tutor.component.html',
  styleUrl: './register-tutor.component.scss',
  standalone: true,
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
      planSeleccionado: ['', Validators.required]  // Plan de suscripción
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const tutorData = this.registerForm.value;

      this.authService.registerTutor(tutorData).subscribe({
        next: () => {
          this.showSnackBar('Registro exitoso. Redirigiendo a la página de pago.');
          this.router.navigate(['/auth/login']);
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
*/


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

}
