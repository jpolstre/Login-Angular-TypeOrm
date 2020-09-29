//LOS INTERCEPTORS NO SON MAS QUE UN MIDDLEWARE, EN ESTE CASO  para enviar el token, EN EL HEADER, SIEMPRE Y CUANDO SE DESEE ATACAR UNA URL QUE CONTENGA LA PAABRA "users"
import { AuthService } from '@app/pages/auth/auth.service';
import { Observable } from 'rxjs';

import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}
  // es como middleware

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('users')) {
      //solo para acceder a rutas que incluyan la palabra "admin" (Ej: localhost:4500/users, para obtener todos los users)
      const authToken = this.authSvc.userTokenValue;
      // debugger;
      // Toma la petición crea una nueva con header token y la enviá devuelta.
      const autReq = req.clone({
        setHeaders: {
          auth: authToken,
        },
      }); // si no resolvemos la misma petición (elemplo: auth/login).
      return next.handle(autReq);
    }
    return next.handle(req);
    // debugger;
  }
}
