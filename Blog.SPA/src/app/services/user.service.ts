import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
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
    console.error('An error occurred:', error);  // Log the entire error object for debugging
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client-side or network error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  public getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
