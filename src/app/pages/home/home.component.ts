import { Component } from '@angular/core';
import {CarouselComponent} from '../../component/carousel/carousel.component';
import {CommentComponent} from '../../component/comment/comment.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    CommentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
