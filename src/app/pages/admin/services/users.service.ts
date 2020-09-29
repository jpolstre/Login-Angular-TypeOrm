import { User } from '@shared/models/user.interface';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.API_URL}/users`)
      .pipe(catchError(this.handleError));
  }

  getById(userId: number): Observable<User> {
    return this.http
      .get<User>(`${environment.API_URL}/users/${userId}`)
      .pipe(catchError(this.handleError));
  }

  new(user: User): Observable<User> {
    return this.http
      .post<User>(`${environment.API_URL}/users`, user)
      .pipe(catchError(this.handleError));
  }
  update(userId: number, user: User): Observable<User> {
    return this.http
      .patch<User>(`${environment.API_URL}/users/${userId}`, user)
      .pipe(catchError(this.handleError));
  }

  delete(userId: number): Observable<{}> {
    return this.http
      .delete<User>(`${environment.API_URL}/users/${userId}`)
      .pipe(catchError(this.handleError));
  }

  // Es como Promise<never>

  handleError(error: any): Observable<never> {
    let errorMessage = 'Error Unknown';
    if (error) {
      errorMessage = `Error: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
