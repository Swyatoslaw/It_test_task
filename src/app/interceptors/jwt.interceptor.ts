import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {currentUserWithToken} from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem(currentUserWithToken));
    if (user && user.token) {
      const request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return next.handle(request);
    }
    return next.handle(req);
  }
}
