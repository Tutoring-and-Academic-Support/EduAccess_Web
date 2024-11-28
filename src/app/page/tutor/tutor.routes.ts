/* src/app/page/dashboard-tutor/tutor.routes.ts

import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guard/auth.guard';
import { DashboardTutorComponent } from '../dashboard-tutor/dashboard-tutor/dashboard-tutor.component';
import { CursosComponent } from '../dashboard-tutor/cursos/cursos.component';
export const tutorRoutes: Routes = [
  {
    path: 'dashboard-tutor',
    component:  CursosComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'TUTOR' },
    children: [
      /*{
        path: 'inicio',
        loadComponent: () => import('./inicio/inicio.component').then(m => m.InicioComponent),
      },
      {
        path: 'invitar-estudiantes',
        loadComponent: () => import('../dashboard-tutor/invite-students/invite-students.component').then(m => m.InviteStudentsComponent),
      },
      {
        path: 'perfil',
        loadComponent: () => import('../dashboard-tutor/profile-tutor/profile-tutor.component').then(m => m.ProfileTutorComponent),
      },
      {
        path: 'cursos',
        loadComponent: () => import('../dashboard-tutor/cursos/cursos.component').then(m => m.CursosComponent),
      },
      // Otras rutas hijas del tutor
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
];*/
