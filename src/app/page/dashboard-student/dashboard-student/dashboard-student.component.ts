import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Section } from '../../../../app/shared/model/section.model';
@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    CommonModule
  ],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.scss'
})
export class DashboardStudentComponent implements OnInit {
  isCollapsed: boolean = false;
  activeSection: string = 'dashboard';
  sections: Section[] = []; // Tipar el arreglo de secciones

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isPaymentComplete()) {
      this.sections = [
        { name: 'cursos-student', label: 'Cursos', link: '/dashboard-student/cursos', icon: 'fas fa-book' },
        { name: 'perfil-student', label: 'Perfil', link: '/dashboard-student/perfil', icon: 'fas fa-user' },
      ];
    } else {
      this.sections = [];
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  setActive(section: string) {
    this.activeSection = section;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
