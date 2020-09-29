import { Roles } from '@shared/models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User, UserResponse } from '@shared/models/user.interface';

import { environment } from '@env/environment';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
  private userToken = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string> {
    return this.role.asObservable();
  }
  get userTokenValue(): string {
    return this.userToken.getValue();
  }
 
  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          // console.log('res', res);
          this.saveStorage(user);
          this.loggedIn.next(true);
          this.role.next(user.role);
          this.userToken.next(user.token);
          return user;
        }),
        catchError((err) => this.handleError(err))
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.role.next(null);
    this.userToken.next(null);
    this.router.navigate(['/login']);
  }

  private checkToken() {
    const user = JSON.parse(localStorage.getItem('user' || null));
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
        this.role.next(user.role);
        this.userToken.next(user.token)
      }
    }

    // console.log('isExpired->', isExpired);

    // isExpired ? this.logout() : this.loggedIn.next(true);
    // if(isExpired){
    //   this.logout()
    // }else{
    //   this.loggedIn.next(true)
    // }
    // set userIsLogged = isExpired
  }

  private saveStorage(user: UserResponse) {
    //rest ={token, role}
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private handleError(error: any) {
    let errorMessage = 'An Error ocurred retrived data';
    if (error) {
      errorMessage = `Error: code ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
