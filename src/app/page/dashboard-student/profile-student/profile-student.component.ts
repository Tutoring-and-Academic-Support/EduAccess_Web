import { Component, OnInit } from '@angular/core';
import { ProfileService} from '../../../core/service/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfile as UserProfileModel } from '../../../shared/model/user-profile.model'; // Importa el modelo
import { AuthService } from '../../../core/service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-student',
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
  ],
  templateUrl: './profile-student.component.html',
  styleUrl: './profile-student.component.scss'
})
export class ProfileStudentComponent implements OnInit {

  isLoading: boolean = true;
  error: string = '';
  isEditing: boolean = false; 

  isCollapsed: boolean = false;
  activeSection: string = 'dashboard';
  originalProfile: UserProfileModel | null = null; // Para guardar una copia del perfil original

  profile: UserProfileModel = {
    id: 0,
    email: '',
    nombre: '',
    apellidos: '',
    departamento: '',
    ciclo: 0,
    role: '',
  }; // Asigna un objeto vacío inicial para evitar errores.

  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,

  ) { }


  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data: UserProfileModel) => {
        this.profile = { ...data }; // Asigna el perfil actual
        this.originalProfile = { ...data }; // Guarda una copia para cancelar cambios
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener el perfil:', err);
        this.error = 'No se pudo cargar el perfil.';
        this.isLoading = false;
        this.snackBar.open(this.error, 'Cerrar', { duration: 3000 });
      },
    });
  }

  enableEditing(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    if (this.profile) {
      this.profileService.updateProfile(this.profile).subscribe({
        next: () => {
          this.originalProfile = { ...this.profile }; // Actualiza la copia original
          this.isEditing = false;
          this.snackBar.open('Cambios guardados exitosamente.', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
          this.snackBar.open('No se pudieron guardar los cambios.', 'Cerrar', { duration: 3000 });
        },
      });
    }
  }

  cancelChanges(): void {
    if (this.originalProfile) {
      this.profile = { ...this.originalProfile }; // Restaura los datos originales
    }
    this.isEditing = false; // Desactiva el modo de edición
    this.snackBar.open('Edición cancelada.', 'Cerrar', { duration: 3000 });
  }
}