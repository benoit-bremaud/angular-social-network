import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router'; // import provideRouter and withEnabledBlockingInitialNavigation from @angular/router package to provide the Router service to the application components and services

import { AppComponent } from './app/app.component'; // import AppComponent from app/app.component to bootstrap the application with the root component of the application
/**
 * The main.ts file is the entry point of the Angular application.
 * It bootstraps the application with the root component, HttpClient service, and Router service.
 */
import { bootstrapApplication } from '@angular/platform-browser'; // import bootstrapApplication from @angular/platform-browser package to bootstrap the application with the root component of the application
import { provideHttpClient } from '@angular/common/http'; // import provideHttpClient from @angular/common/http package to provide the HttpClient service to the application components and services
import { routes } from './app/app.routes'; // import routes from app/app.routes to define the routes of the application

/**
 * The bootstrapApplication function is called with the AppComponent as the first argument and an object with the providers property as the second argument.
 * The providers property is an array of providers that are used to provide services to the application components and services.
 * The provideHttpClient function is used to provide the HttpClient service to the application components and services.
 * The provideRouter function is used to provide the Router service to the application components and services.
 * The withEnabledBlockingInitialNavigation function is used to enable blocking initial navigation in the Router service.
 * The routes object is used to define the routes of the application.
 * The bootstrapApplication function is called with the root component, HttpClient service, and Router service as arguments.
 * The catch method is used to catch any errors that occur during the bootstrap process and log them to the console.
 */
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withEnabledBlockingInitialNavigation())
  ]
}).catch(err => console.error(err)); // bootstrap the application with the root component, HttpClient service, and Router service, and catch any errors that occur during the bootstrap process
