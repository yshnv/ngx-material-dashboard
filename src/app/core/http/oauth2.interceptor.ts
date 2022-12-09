import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, switchMap, filter, take } from 'rxjs/operators';

import { HttpApi } from './http-api';
import { AuthService } from '../services/auth.service';

@Injectable()
export class Oauth2Interceptor implements HttpInterceptor {
  refreshTokenInProgress: boolean = false;
  refreshTokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(this.performRequest(req))
      .pipe(catchError((err) => this.processRequestError(err, req, next)));
  }

  private performRequest(req: HttpRequest<any>): HttpRequest<any> {
    // console.log(
    //   "🚀 ~ file: oauth2.interceptor.ts ~ line 35 ~ Oauth2Interceptor ~ performRequest ~ req",
    //   req
    // );
    let headers: HttpHeaders = req.headers;
    if (this.isAuthenticationRequired(req.url)) {
      headers = headers.set(
        'Authorization',
        `Bearer ${this.authService.accessToken}`
      );
    }

    return req.clone({ headers });
  }

  private processRequestError(
    error: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (error.status === 401 && this.authService.isLogged()) {
      return this.tryAgainWithRefresToken(req, next);
    }

    return throwError(error);
  }

  // Helpers and Casuistics
  private isAuthenticationRequired(apiUrl: string): boolean {
    // console.log(
    //   "🚀 ~ file: oauth2.interceptor.ts ~ line 60 ~ Oauth2Interceptor ~ isAuthenticationRequired ~ apiUrl",
    //   apiUrl
    // );
    const blockedApiList = [HttpApi.oauthLogin, 'assets/i18n'];
    return blockedApiList.includes(apiUrl) ? false : true;
  }

  private tryAgainWithRefresToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (!this.refreshTokenInProgress) {
      // Set the refreshToknSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(false);
      this.refreshTokenInProgress = true;

      return this.authService.loginWithRefreshToken().pipe(
        switchMap((result: boolean) => {
          console.log(
            '🚀 ~ file: oauth2.interceptor.ts ~ line 83 ~ Oauth2Interceptor ~ switchMap ~ result',
            result
          );
          if (result) {
            this.refreshTokenSubject.next(result);
            return next.handle(this.performRequest(req));
          }

          throw new Error('Acceso denegado.');
        }),
        catchError((error) => {
          console.log(
            '🚀 ~ file: oauth2.interceptor.ts ~ line 91 ~ Oauth2Interceptor ~ catchError ~ error',
            error
          );
          this.authService.logout();

          return throwError(error);
        }),
        finalize(() => {
          this.refreshTokenInProgress = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((result) => result != null),
        take(1),
        switchMap(() => next.handle(this.performRequest(req)))
      );
    }
  }
}
