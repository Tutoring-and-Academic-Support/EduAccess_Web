import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf
import { RouterModule, Router, RouterLink, RouterOutlet } from '@angular/router'; // Para routerLink
import { MatMenuModule } from '@angular/material/menu'; // Para mat-menu
import { MatButtonModule } from '@angular/material/button'; // Para mat-button
import { MatIconModule } from '@angular/material/icon'; // Opcional: Para iconos
// Eliminar MatToolbarModule si no se usa en la plantilla
// Eliminar BrowserAnimationsModule ya que se importa en main.ts

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule, // Opcional
    // Eliminar MatToolbarModule si no se usa
    // Añade otros módulos si es necesario
  ],
})
export class HeaderComponent {
  showHomeNav: boolean = true;
  showAuthNav: boolean = false;

  constructor(private router: Router) { }

  logout() {
    // Implementa la lógica de cierre de sesión aquí
    console.log('Cerrar sesión');
    // Por ejemplo, limpiar tokens y redirigir
    // localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
