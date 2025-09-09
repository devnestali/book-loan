import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user';
import { take, switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.userService.currentUser$.pipe(
      take(1),
      switchMap(userToken => {
        if (userToken) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${userToken.token}`
            }
          });
        }
        return next.handle(req);
      })
    );
  }
}
