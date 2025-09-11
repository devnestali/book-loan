import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take,  } from 'rxjs';
import { UserService } from '../services/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.userService.currentUser$.pipe(take(1)).subscribe({
      next: (userToken) => {
        if (userToken) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${userToken.token}`,
            },
          });
        }
      },
    });

    return next.handle(req);
  }
}
