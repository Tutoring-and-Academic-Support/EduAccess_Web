/*import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};*/

/*import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { jwtInterceptor } from './core/interceptor/jwt.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi())]
  }*/

    import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
    import { provideRouter } from '@angular/router';
    
    import { routes } from './app.routes';
    import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
    import { provideHttpClient, withInterceptors } from '@angular/common/http';
    import { jwtInterceptor } from './core/interceptor/jwt.interceptor';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { AuthErrorInterceptor } from './core/interceptor/auth-error.interceptor';
    import { withInterceptorsFromDi } from '@angular/common/http';
    import player from 'lottie-web';
    import { provideLottieOptions } from 'ngx-lottie';
    
    export function playerFactory() {
      return player;
    }
    
    export const appConfig: ApplicationConfig = {
      providers: [provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes), 
        //provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        importProvidersFrom(
          BrowserAnimationsModule,
        ),
    
        provideLottieOptions({ 
          player: playerFactory 
        }), // Configuración de Lottie
    
        provideHttpClient(withInterceptors([
          jwtInterceptor,
          AuthErrorInterceptor,
          
        ])),
      ]
    };
    