import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { TokenValidationRequest } from '../models/tokenvalidationrequest';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User";

  constructor(private http: HttpClient, private router: Router) { }

  public login(user: User): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/${this.url}/Login`, user, { responseType: 'text' as 'json' }).pipe(
      map(response => {
        this.handleLoginSuccess(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  public logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/overview']);
  }

  private handleLoginSuccess(response: string) {
    if (response) {
      console.log('Login successful!');
      localStorage.setItem('authToken', response);
    } else {
      console.error('Login response does not contain a valid token:', response);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public isLoggedIn(): Observable<boolean> {
    const request: TokenValidationRequest = { token: this.getAuthToken() ?? '' };
    if (request) {
      return this.http.post<boolean>(`${environment.apiUrl}/${this.url}/validate-token`, request);
    } else {
      return of(false);
    }
  }

  public getAuthToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('authToken');
    } else {
      return null;
    }
  }
}
