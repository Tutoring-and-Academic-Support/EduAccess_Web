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

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  ],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  showHomeNav: boolean = true;
  showAuthNav: boolean = false;
  isMobileMenuOpen: boolean = false; // Nuevo estado para el menú móvil

  constructor(private router: Router) {}

  ngOnInit() {
    // Cambia el estado de navegación según la ruta actual
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.startsWith('/auth')) {
        this.showHomeNav = false;
        this.showAuthNav = true;
      } else {
        this.showHomeNav = true;
        this.showAuthNav = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Función para alternar el menú móvil
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}


