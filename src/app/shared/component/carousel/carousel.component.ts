import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {CommonModule} from '@angular/common';

interface Slide {
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentSlide = 0;

  //Agregar aqui los links de las imagenes que se van a mostrar en el carousel
  slides: Slide[] = [
    {
      imageUrl: "https://images.pexels.com/photos/6266984/pexels-photo-6266984.jpeg",
      title: "Impulsa tu futuro académico",
      description: "Accede a recursos y convenios con universidades",
      ctaText: "Explora Nuestros Planes"
    },
    {
      imageUrl: "https://www.sumerlylearning.com/images/metodo-de-aprendizaje.webp",
      title: "Conéctate con las mejores oportunidades",
      description: "EduAccess te conecta con herramientas digitales para el éxito.",
      ctaText: "Conoce Más Acerca de Nosotros"
    },
    {
      imageUrl: "https://tesisymasters.com.ar/wp-content/uploads/imagenes-de-blog-9.jpg",
      title: "Aprende desde cualquier lugar",
      description: "Descubre cómo EduAccess facilita el aprendizaje remoto.",
      ctaText: "Únete Hoy"
    }
  ];

  private autoplayInterval: any;
  isPlaying = false;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === "ArrowLeft") this.prevSlide();
    if (event.key === "ArrowRight") this.nextSlide();
  }

  prevSlide(): void {
    this.currentSlide =
      this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  toggleAutoplay(): void {
    this.isPlaying ? this.stopAutoplay() : this.startAutoplay();
  }

  private startAutoplay(): void {
    this.isPlaying = true;
    this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  private stopAutoplay(): void {
    this.isPlaying = false;
    clearInterval(this.autoplayInterval);
  }
}
