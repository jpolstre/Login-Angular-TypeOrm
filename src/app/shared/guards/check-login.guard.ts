import { AuthService } from '@app/pages/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authSvc: AuthService) { }


  canActivate(): Observable<boolean> {
    //se puede hacer pipe ya que isLogged es un observable, ademas take(1) toma el primer valor
    return this.authSvc.isLogged.pipe(
      take(1),
      /*!islogged, por que no queremos que el usuario acceda a esa ruta cuando esta loggeado(ruta /login) */
      map((islogged: boolean) => !islogged)
    )
  }

}
