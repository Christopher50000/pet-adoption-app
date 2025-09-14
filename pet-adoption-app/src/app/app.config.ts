import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ]
};

//in a standalone environment and includes any class-based interceptors you've registered using the HTTP_INTERCEPTORS token.
//
// provideHttpClient() is the modern way to enable HttpClient without importing HttpClientModule.
//
// withInterceptorsFromDi() tells Angular to pull in interceptors from the dependency injection system — useful if you’ve registered interceptors like this:

//importProvidersFrom(...)
// This function allows you to import providers from NgModules or standalone components into your application-level injector.
//
// It’s essential when using modules like HttpClientInMemoryWebApiModule in a standalone app.
//
// Think of it as a bridge that lets you use traditional module-based providers in the new standalone world.

// HttpClientInMemoryWebApiModule.forRoot(...)
// This sets up the in-memory web API, which intercepts HTTP requests and returns mock data from memory instead of hitting a real backend.
