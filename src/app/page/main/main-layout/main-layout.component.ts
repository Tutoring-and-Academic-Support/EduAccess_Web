import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/component/header/header.component";
import { FooterComponent } from "../../../shared/component/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent { }
