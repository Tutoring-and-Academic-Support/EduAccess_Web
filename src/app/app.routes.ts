import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {CommentComponent} from './component/comment/comment.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // Define otras rutas aquí
  { path: 'login', component: HomeComponent },
  { path: 'register', component: HomeComponent },
  { path: 'comment', component: CommentComponent },
  //{ path: '**', redirectTo: '/home' }, // Ruta para manejar errores 404
];
