import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError, finalize, timeout } from 'rxjs/operators';

import { HttpError } from './http-error';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

import { HttpApi } from './http-api';
import { AuthService } from '../services/auth.service';

const APP_XHR_TIMEOUT = 30000;

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.performRequest(req)).pipe(
      timeout(APP_XHR_TIMEOUT),
      map((res) => this.handleSuccessfulResponse(res)),
      catchError((err) => this.handleErrorResponse(err)),
      finalize(this.handleRequestCompleted.bind(this))
    );
  }

  private performRequest(req: HttpRequest<any>): HttpRequest<any> {
    // console.log(
    //   "🚀 ~ file: http.interceptor.ts ~ line 37 ~ AppInterceptor ~ performRequest ~ req",
    //   req
    // );
    let headers: HttpHeaders = req.headers;

    return req.clone({
      url: `${req.url}`,
      headers,
    });
  }
  // Helpers and Casuistics
  private isAuthenticationRequired(apiUrl: string): boolean {
    // console.log(
    //   "🚀 ~ file: oauth2.interceptor.ts ~ line 60 ~ Oauth2Interceptor ~ isAuthenticationRequired ~ apiUrl",
    //   apiUrl
    // );
    const blockedApiList = [HttpApi.oauthLogin, 'assets/i18n'];
    return apiUrl.includes('assets/i18n') ? false : true;
  }

  private handleSuccessfulResponse(event: any): HttpResponse<any> {
    // if (event instanceof HttpResponse) {
    //   event = event.clone({ body: event.body.response });
    // }
    return event;
  }

  private handleErrorResponse(errorResponse: any): Observable<HttpEvent<any>> {
    let customError = new HttpError();
    try {
      customError = HttpError.initWithCode(
        errorResponse.error.errors[0].code
          ? errorResponse.error.errors[0].code
          : errorResponse.error.errors[0].message
      );
    } catch (e) {}

    return throwError(customError);
  }

  private handleRequestCompleted(): void {
    // console.log(`Request finished`);
  }
}
