import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard-tutor',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './dashboard-tutor.component.html',
  styleUrls: ['./dashboard-tutor.component.scss'],
})
export class DashboardTutorComponent {
  isCollapsed: boolean = false;

  sections = [
    { name: 'dashboard', label: 'Inicio', link: '/dashboard', icon: 'fas fa-home' },
    { name: 'settings', label: 'Ajustes', link: '/settings', icon: 'fas fa-cog' },
    { name: 'profile', label: 'Perfil', link: '/profile', icon: 'fas fa-user' },
  ];

  activeSection: string = 'dashboard';

  constructor(private router: Router, private authService: AuthService,) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  setActive(section: string) {
    this.activeSection = section;
  }


  ngOnInit(): void {
    // Puedes cargar información adicional aquí si es necesario
  }

  
  // src/app/page/dashboard-tutor/dashboard-tutor.component.ts
logout(): void {
  this.authService.logout(); // Limpia el estado de autenticación
  this.router.navigate(['/auth/login']); // Redirige al login
}


}
