/*app.routes.ts
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './page/auth/auth-layout/auth-layout.component';
import { LoginComponent } from './page/auth/login/login.component';
import { RegisterTutorComponent } from './page/auth/register-tutor/register-tutor.component';
import { MainLayoutComponent } from './page/main/main-layout/main-layout.component';
import { HomeComponent } from './page/home/home/home.component';
import { DashboardTutorComponent } from './page/dashboard-tutor/dashboard-tutor/dashboard-tutor.component';
import { DashboardStudentComponent } from './page/dashboard-student/dashboard-student/dashboard-student.component';
import { AuthGuard } from './core/guard/auth.guard';
import { PaymentSuccessComponent } from './page/dashboard-tutor/payment-success/payment-success.component';
import { InviteStudentsComponent } from './page/dashboard-tutor/invite-students/invite-students.component';

export const routes: Routes = [

  { path: 'inicio', component: MainLayoutComponent,
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
  {
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
  
  { path: 'payment-success', component: PaymentSuccessComponent },
  { 
    path: 'invitar-estudiantes', 
    component: InviteStudentsComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'TUTOR' } 
  },
   
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }


];*/
/*src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './page/auth/auth-layout/auth-layout.component';
import { LoginComponent } from './page/auth/login/login.component';
import { RegisterTutorComponent } from './page/auth/register-tutor/register-tutor.component';
import { MainLayoutComponent } from './page/main/main-layout/main-layout.component';
import { HomeComponent } from './page/home/home/home.component';
import { DashboardTutorComponent } from './page/dashboard-tutor/dashboard-tutor/dashboard-tutor.component';
import { DashboardStudentComponent } from './page/dashboard-student/dashboard-student/dashboard-student.component';
import { AuthGuard } from './core/guard/auth.guard';
import { PaymentSuccessComponent } from './page/dashboard-tutor/payment-success/payment-success.component';
import { InviteStudentsComponent } from './page/dashboard-tutor/invite-students/invite-students.component';
import { RegisterStudentComponent } from './page/auth/register-student/register-student.component';
import { CursosComponent } from './page/dashboard-tutor/cursos/cursos.component';
import { ProfileTutorComponent } from './page/dashboard-tutor/profile-tutor/profile-tutor.component';

export const routes: Routes = [

  { path: 'inicio', 
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
    ]
   },

   {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register-tutor', component: RegisterTutorComponent },
      { path: 'register-student', component: RegisterStudentComponent },
    ],
  },

    // Dashboard inicial después del registro
    {
      path: 'dashboard',
      component: DashboardTutorComponent,
    },

    { path: 'payment-success', component: PaymentSuccessComponent },

    {
      path: 'dashboard-tutor',
      component: InviteStudentsComponent,
      canActivate: [AuthGuard],
      data: { expectedRole: 'TUTOR' },
      children: [
        { path: 'invitar-estudiantes', component: InviteStudentsComponent },
        { path: 'cursos', component: CursosComponent },
        { path: 'perfil', component: ProfileTutorComponent },
        { path: '', redirectTo: 'invitar-estudiantes', pathMatch: 'full' },
      ],
    },

    

    /*{
      path: 'payment-success',
      component: PaymentSuccessComponent,
      canActivate: [AuthGuard],
      data: { expectedRole: 'TUTOR' },
    },
    
  {
    path: 'student-dashboard',
    component: DashboardStudentComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ESTUDIANTE' }
  },

  
  
   
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }

];*/

// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './page/auth/auth-layout/auth-layout.component';
import { LoginComponent } from './page/auth/login/login.component';
import { RegisterTutorComponent } from './page/auth/register-tutor/register-tutor.component';
import { MainLayoutComponent } from './page/main/main-layout/main-layout.component';
import { HomeComponent } from './page/home/home/home.component';
import { DashboardTutorLayoutComponent } from './page/dashboard-tutor/dashboard-tutor-layout/dashboard-tutor-layout.component';
import { AuthGuard } from './core/guard/auth.guard';
import { PaymentGuard } from './core/guard/payment.guard';
import { InviteStudentsComponent } from './page/dashboard-tutor/invite-students/invite-students.component';
import { RegisterStudentComponent } from './page/auth/register-student/register-student.component';
import { CursosComponent } from './page/dashboard-tutor/cursos/cursos.component';
import { ProfileTutorComponent } from './page/dashboard-tutor/profile-tutor/profile-tutor.component';
import { PaymentSuccessComponent } from './page/dashboard-tutor/payment-success/payment-success.component';
import { DashboardTutorComponent } from './page/dashboard-tutor/dashboard-tutor/dashboard-tutor.component';
import { DashboardStudentComponent } from './page/dashboard-student/dashboard-student/dashboard-student.component';
import { ProfileStudentComponent } from './page/dashboard-student/profile-student/profile-student.component';
import { CursosStudentComponent } from './page/dashboard-student/cursos-student/cursos-student.component';


export const routes: Routes = [
  { 
    path: 'inicio', 
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register-tutor', component: RegisterTutorComponent },
    ],
  },

  {
    path: 'dashboard-tutor',
    component: DashboardTutorLayoutComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'TUTOR' },
    children: [
      {
        path: '',
        component: DashboardTutorComponent // Muestra los planes
      },
      {
        path: 'payment-success',
        component: PaymentSuccessComponent
      },
      {
        path: 'invitar-estudiantes',
        component: InviteStudentsComponent,
        canActivate: [PaymentGuard]
      },
      {
        path: 'cursos',
        component: CursosComponent,
        canActivate: [PaymentGuard]
      },
      {
        path: 'perfil',
        component: ProfileTutorComponent,
        canActivate: [PaymentGuard]
      },
     // { path: 'cursos/:id', component: CursoDetalleComponent }, 

    ],
  },

  //Rutas del estudiante
  {
    path: 'dashboard-student',
    component: DashboardStudentComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ESTUDIANTE' },
    children: [
      {
        path: '',
        component: CursosStudentComponent// Muestra los planes
      },
      {
        path: 'perfil-student',
        component: ProfileStudentComponent,
      },
      {
        path: 'cursos-student',
        component: CursosStudentComponent,
      },
     // { path: 'cursos/:id', component: CursoDetalleComponent }, 

    ],
  },

  {
    path: 'registro-estudiante',
    component: RegisterStudentComponent
  },

  // Otras rutas...
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' }
];


