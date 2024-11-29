/*import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { Component } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const authRoutes: Routes = [

    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
        //    { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
]*/

// auth.routes.ts

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterTutorComponent } from './register-tutor/register-tutor.component'; // Asegúrate de que esté bien importado
import { CarouselComponent } from '../../shared/component/carousel/carousel.component'; // Importa tu carrusel
import { RegisterStudentComponent } from './register-student/register-student.component';
export const authRoutes: Routes = [
  {
      path:'',
      component: AuthLayoutComponent,
      children:[
          {path:'login', component:LoginComponent},
          {path:'register-tutor', component:RegisterTutorComponent},
        {path: 'registro-estudiante', component: RegisterStudentComponent },
      ]
  }
];
