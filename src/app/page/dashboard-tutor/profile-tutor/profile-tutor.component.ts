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
  selector: 'app-profile-tutor',
  standalone: true,
  imports: [
      MatSpinner,
      CommonModule,
      FormsModule,
  ],
  templateUrl: './profile-tutor.component.html',
  styleUrl: './profile-tutor.component.scss'
})
export class ProfileTutorComponent implements OnInit {
  profile: UserProfileModel | null = null; // Usa el modelo importado
  isLoading: boolean = true;
  error: string = '';

  isCollapsed: boolean = false;
  activeSection: string = 'dashboard';

  // In TutorLayoutComponent or wherever your sidebar logic is
sections = [
  { name: 'cursos', label: 'Cursos', link: '/dashboard-tutor/cursos', icon: 'fas fa-book' },
  { name: 'invitar-estudiantes', label: 'Invitar', link: '/dashboard-tutor/invitar-estudiantes', icon: 'fas fa-user-plus' },
  { name: 'perfil', label: 'Perfil', link: '/dashboard-tutor/perfil', icon: 'fas fa-user' },
];


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
        this.profile = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener el perfil:', err);
        this.error = 'No se pudo cargar el perfil.';
        this.isLoading = false;
        this.snackBar.open(this.error, 'Cerrar', { duration: 3000 });
      }
    });
  }

  saveChanges(): void {
    if (this.profile) {
      this.profileService.updateProfile(this.profile).subscribe({
        next: () => {
          this.snackBar.open('Cambios guardados exitosamente.', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error al guardar los cambios:', err);
          this.snackBar.open('No se pudieron guardar los cambios.', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
  
  cancelChanges(): void {
    this.fetchProfile(); // Vuelve a cargar el perfil original
    this.snackBar.open('Cambios cancelados.', 'Cerrar', { duration: 3000 });
  }
  

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


  setActive(section: string) {
    this.activeSection = section;
  }

  logout(): void {
    this.authService.logout(); // Limpia el estado de autenticación
    this.router.navigate(['/auth/login']); // Redirige al login
  }

}
