import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User";

  constructor(private http: HttpClient) { }

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

  public isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      const isLoggedIn = !!localStorage.getItem("authToken");
      return isLoggedIn;
    }
    else {
      return false;
    }
  }

  public getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
