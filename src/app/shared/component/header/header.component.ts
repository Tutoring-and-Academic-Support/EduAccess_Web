/*import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterLink, RouterOutlet } from '@angular/router';
//import { MatMenuModule } from '@angular/material/menu'; // Para mat-menu
//import { MatButtonModule } from '@angular/material/button'; // Para mat-button
//import { MatIconModule } from '@angular/material/icon'; // Opcional: Para iconos
import { AuthService } from '../../../core/service/auth.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,

  imports: [
    RouterLink,
      RouterOutlet,
    CommonModule,
    RouterModule
   // MatMenuModule,
    //MatButtonModule,
    //MatIconModule
  ],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  showHomeNav: boolean = true;
  showAuthNav: boolean = false;

  constructor(private router: Router) { }

  logout() {
    // Implementa la lógica de cierre de sesión aquí
    console.log('Cerrar sesión');
    // Por ejemplo, limpiar tokens y redirigir
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}*/

// shared/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  userRole: string | null = null;
  isMobileMenuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateAuthStatus();

    // Suscribirse a cambios en la navegación para actualizar el estado de autenticación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateAuthStatus();
    });
  }

  updateAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userRole = this.authService.getUserRole();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

