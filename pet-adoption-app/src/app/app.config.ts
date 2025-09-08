import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InMemoryDataService } from './shared/InMemoryDbService/in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        apiBase: 'api', // this names the base URL for the in-memory database and since we return the pets array from the in-memory database, we can use the api/pets endpoint
        dataEncapsulation: false, // this disables data encapsulation, which means that the in-memory web api will return the pets array as is
        delay: 5000, // this simulates a delay in the response
        passThruUnknownUrl: true // this allows the in-memory web api to pass through unknown URLs
      })
    ),

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
