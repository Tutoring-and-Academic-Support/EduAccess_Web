import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  //Cambiar esto si se quieren agregar mas rutas
  showHomeNav: boolean = true; // Estado para mostrar Login/Register en la "Home Page"
  showAuthNav: boolean = false; // Estado para mostrar el botón "Ir al Inicio" en "Login" y "Register"

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detecta los cambios de ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;

        //Cambiar esto si se quieren agregar mas rutas, ademas agregar las rutas en "header.component.html"
        // Ajusta los estados dependiendo de la ruta actual
        this.showHomeNav = currentRoute === '/home';
        this.showAuthNav = currentRoute === '/login' || currentRoute === '/register';
      }
    });
  }
}
