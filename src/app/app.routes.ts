/*import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './page/auth/auth-layout/auth-layout.component';
import { LoginComponent } from './page/auth/login/login.component';
import { RegisterTutorComponent } from './page/auth/register-tutor/register-tutor.component';
import { MainLayoutComponent } from './page/main/main-layout/main-layout.component';
import { HomeComponent } from './page/home/home/home.component';
import { DashboardTutorComponent } from './page/dashboard-tutor/dashboard-tutor/dashboard-tutor.component';
//import { DashboardStudentComponent } from './page/dashboard-student/dashboard-student.component'; // Si tienes un dashboard para estudiantes
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardTutorComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'TUTOR' }
  },
  /*{
    path: 'student-dashboard',
    component: DashboardStudentComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ESTUDIANTE' }
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register-tutor', component: RegisterTutorComponent }
    ]
  },
  { path: '**', redirectTo: '/' }
];*/

// app.routes.ts
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './page/auth/auth-layout/auth-layout.component';
import { LoginComponent } from './page/auth/login/login.component';
import { RegisterTutorComponent } from './page/auth/register-tutor/register-tutor.component';
import { MainLayoutComponent } from './page/main/main-layout/main-layout.component';
import { HomeComponent } from './page/home/home/home.component';
import { DashboardTutorComponent } from './page/dashboard-tutor/dashboard-tutor/dashboard-tutor.component';
//import { DashboardStudentComponent } from './page/dashboard-student/dashboard-student.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardTutorComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'TUTOR' }
  },
  /*{
    path: 'student-dashboard',
    component: DashboardStudentComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ESTUDIANTE' }
  },*/
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register-tutor', component: RegisterTutorComponent }
    ]
  },
  { path: '**', redirectTo: '/' }
];
