// shared/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})


export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  userRole: string | null = null;
  isMobileMenuOpen: boolean = false;
  showHomeNav: boolean = false; // Agrega esta propiedad
  showAuthNav: boolean = false; // Agrega esta propiedad

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

// src/app/shared/component/header/header.component.ts

updateAuthStatus() {
  this.isAuthenticated = this.authService.isAuthenticated();
  this.userRole = this.authService.getUserRole();
  
  // Lógica para mostrar la navegación adecuada
  this.showHomeNav = !this.isAuthenticated;
  this.showAuthNav = this.isAuthenticated;

  console.log('isAuthenticated:', this.isAuthenticated);
  console.log('showHomeNav:', this.showHomeNav);
  console.log('showAuthNav:', this.showAuthNav);
}


  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

