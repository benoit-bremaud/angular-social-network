import { RegisterComponent } from './components/register/register.component';
/**
 * This file is used to define the routes of the application.
 * The routes array is exported so that it can be imported and used in other parts of the application.
 */
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent },
  // Other routes go here
];
