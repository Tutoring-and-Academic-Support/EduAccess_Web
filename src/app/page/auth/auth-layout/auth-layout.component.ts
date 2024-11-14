import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/component/header/header.component";
import { FooterComponent } from "../../../shared/component/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'
//import { CarouselComponent } from '../../../shared/component/carousel/carousel.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  constructor() {
    console.log('AuthLayoutComponent loaded'); // Añade este log para depurar
  }

}
