// src/app/page/dashboard-tutor/dashboard-tutor.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-tutor',
  templateUrl: './dashboard-tutor.component.html',
  styleUrls: ['./dashboard-tutor.component.scss'],
  standalone: true,
})
export class DashboardTutorComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Puedes cargar información adicional aquí si es necesario
  }

  
  logout(): void {
    console.log("Cerrar sesión");
    this.router.navigate(['/login']);
  }

}
