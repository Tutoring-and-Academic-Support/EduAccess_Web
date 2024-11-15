// app.routes.ts
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './page/auth/auth-layout/auth-layout.component';
import { LoginComponent } from './page/auth/login/login.component';
import { RegisterTutorComponent } from './page/auth/register-tutor/register-tutor.component';
import { MainLayoutComponent } from './page/main/main-layout/main-layout.component';
import { HomeComponent } from './page/home/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent }, // Ruta principal
            // Añade otras rutas principales aquí, por ejemplo:
            // { path: 'student', component: StudentComponent },
            // { path: 'tutor', component: TutorComponent },
        ]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register-tutor', component: RegisterTutorComponent }
        ]
    },
    { path: '**', redirectTo: '' } // Redirige rutas desconocidas a la página principal
];

