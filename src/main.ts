// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Suponiendo que tienes un archivo de rutas
import { provideHttpClient, withFetch } from '@angular/common/http';
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    provideHttpClient(withFetch())
  ],
  
})
  .catch(err => console.error(err));
