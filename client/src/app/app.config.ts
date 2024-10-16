import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const env = {
  baseUrl: 'http://127.0.0.1:8000/api',
  supabaseUrl: 'https://asfxxcqggmbbyatezedn.supabase.co',
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzZnh4Y3FnZ21iYnlhdGV6ZWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMDQ1MTMsImV4cCI6MjA0MTc4MDUxM30.gEKv1axhf5CezFxwdZPWR5jfzyr8A99X5yuOqNMNMu0"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr(), provideAnimationsAsync()
  ]
};
