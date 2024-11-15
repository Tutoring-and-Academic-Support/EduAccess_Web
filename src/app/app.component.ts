import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EduAccess_Web';
  showHeaderAndFooter = true;

  constructor(private router: Router) {
    // Suscríbete a los cambios de ruta
    this.router.events.subscribe(() => {
      // Verifica si la ruta actual es "register-tutor"
      this.showHeaderAndFooter = !this.router.url.includes('register-tutor');
    });
  }
}
