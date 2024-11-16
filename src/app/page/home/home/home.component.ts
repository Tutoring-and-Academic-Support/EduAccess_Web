// home.component.ts
import { Component } from '@angular/core';
import { CarouselComponent } from '../../../shared/component/carousel/carousel.component';
// Asegúrate de importar otros componentes si los usas, como CommentComponent

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    // Añade otros componentes si es necesario
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { }
