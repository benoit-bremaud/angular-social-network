import { HttpClient } from '@angular/common/http'; // import HttpClient from @angular/common/http
import { Injectable } from '@angular/core'; // import Injectable from @angular/core
import { Observable } from 'rxjs'; // import Observable from rxjs package to use it as a return type
import { tap } from 'rxjs/operators'; // import tap from rxjs/operators package to use it in the pipe method of the Observable object returned by the login method  // import HttpClient from @angular/common/http

/**
 * Injectable is a decorator that allows Angular to inject the service into the components.
 * It is a class-level decorator that is used to declare a class as a service.
 * The providedIn property of the @Injectable decorator is used to specify the root injector of the service.
 * The root injector is the injector that is available for the entire application.
 * The providedIn property is set to 'root' to specify that the service should be provided in the root injector.
 * The AuthService class is exported so that it can be imported and used in other parts of the application.
 * The AuthService class has a constructor that takes an instance of the HttpClient class as a parameter.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // apiUrl property is set to the URL of the authentication API

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user); // register method takes a user object as a parameter and returns an Observable object that makes a POST request to the register endpoint of the authentication API
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); // The tap operator is used to perform side effects such as storing the token in the local storage when the login request is successful
      })
    ); // login method takes a credentials object as a parameter and returns an Observable object that makes a POST request to the login endpoint of the authentication API
  }

  logout(): void {
    localStorage.removeItem('token'); // logout method removes the token from the local storage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // getToken method retrieves the token from the local storage
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // isLoggedIn method returns true if the token is present in the local storage, otherwise it returns false
  }
}
