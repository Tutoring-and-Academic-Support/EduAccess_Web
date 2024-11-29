import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Section } from '../../../../app/shared/model/section.model';
@Component({
  selector: 'app-dashboard-tutor-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    CommonModule
  ],
  templateUrl: './dashboard-tutor-layout.component.html',
  styleUrl: './dashboard-tutor-layout.component.scss'
})
export class DashboardTutorLayoutComponent implements OnInit {
  isCollapsed: boolean = false;
  activeSection: string = 'dashboard';
  sections: Section[] = []; // Tipar el arreglo de secciones
  private paymentSubscription!: Subscription; // Usar el operador '!' para asignación definitiva

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Inicializar las secciones según el estado de pago
    this.updateSections(this.authService.isPaymentComplete());

    // Suscribirse a los cambios en el estado de pago
    this.paymentSubscription = this.authService.paymentStatus$.subscribe(status => {
      this.updateSections(status);
    });
  }

  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    if (this.paymentSubscription) {
      this.paymentSubscription.unsubscribe();
    }
  }

  private updateSections(isPaid: boolean) {
    if (isPaid) {
      this.sections = [
        { name: 'cursos', label: 'Cursos', link: '/dashboard-tutor/cursos', icon: 'fas fa-book' },
        { name: 'invitar-estudiantes', label: 'Invitar', link: '/dashboard-tutor/invitar-estudiantes', icon: 'fas fa-user-plus' },
        { name: 'perfil', label: 'Perfil', link: '/dashboard-tutor/perfil', icon: 'fas fa-user' },
      ];
    } else {
      this.sections = [
        { name: 'perfil', label: 'Perfil', link: '/dashboard-tutor/perfil', icon: 'fas fa-user' },
      ];
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
