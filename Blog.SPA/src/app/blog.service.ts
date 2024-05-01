import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Blog } from './models/blog';
import { environment } from '../environments/environment.development';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  private url = "Blog";

  constructor(private http: HttpClient) { }

  public getBlogPosts(): Observable<any[]> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}`).pipe(catchError((error: HttpErrorResponse) =>this.handleError(error)));
  }

  // public addBlogPost(blog: Blog): Observable<Blog> {
  //   return this.http.post<Blog>(`${environment.apiUrl}/${this.url}`, blog, httpOptions)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) =>this.handleError(error))
  //     );
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
