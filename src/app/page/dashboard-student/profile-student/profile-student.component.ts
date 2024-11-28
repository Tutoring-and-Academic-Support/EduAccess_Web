import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/service/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfile as UserProfileModel } from '../../../shared/model/user-profile.model'; // Importa el modelo

@Component({
  selector: 'app-profile-student',
  standalone: true,
  imports: [],
  templateUrl: './profile-student.component.html',
  styleUrl: './profile-student.component.scss'
})
export class ProfileStudentComponent {
  profile: UserProfileModel | null = null; // Usa el modelo importado
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data: UserProfileModel) => {
        this.profile = data;
        this.isLoading = false;
      },
/*************  ✨ Codeium Command ⭐  *************/
      /**
/******  e413a2e3-1aa4-4652-9a92-f837a7c404a4  *******/
      error: (err) => {
        console.error('Error al obtener el perfil:', err);
        this.error = 'No se pudo cargar el perfil.';
        this.isLoading = false;
        this.snackBar.open(this.error, 'Cerrar', { duration: 3000 });
      }
    });
  }
}
