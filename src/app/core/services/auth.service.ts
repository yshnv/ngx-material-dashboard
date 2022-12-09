import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { empty, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HttpApi } from '../http/http-api';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

// const OAUTH_DATA = environment.oauth;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserValue: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: HotToastService
  ) {}

  // login(email: string, password: string): Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');

  //   const body = {
  //     email: email,
  //     password: password,
  //   };

  //   return this.http.post(HttpApi.authLogin, body, { headers }).pipe(
  //     this.toast.observe({
  //       loading: 'Loading...',
  //       success: (s) => 'Login Successfully!',
  //       error: (e) => 'Invalid credentials',
  //     }),

  //     map((response: any) => {
  //       localStorage.setItem('session', JSON.stringify(response.tokens));
  //       localStorage.setItem('user', JSON.stringify(response.user));
  //       return response;
  //     })
  //   );
  // }
  loginWithUserCredentials(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const body: any = {};

    body['email'] = email;
    body['password'] = password;

    return this.http.post(HttpApi.oauthLogin, body, { headers }).pipe(
      map((response: any) => {
        localStorage.setItem('token', JSON.stringify(response));
        return response;
      })
    );
  }
  loginWithRefreshToken(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.refreshToken);
    headers = headers.set('Retry', 'True');

    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');

    let rtoken = this.refreshToken;

    return this.http
      .post(
        HttpApi.refreshToken,
        { refreshToken: rtoken },
        { headers: headers }
      )
      .pipe(
        map(
          (response: any) => {
            let temp = {
              token: response.token,
              refresh_token: response.refreshToken,
            };
            localStorage.setItem('session', JSON.stringify(response));

            return response;
          },
          (error: any) => {
            console.log(
              '🚀 ~ file: auth.service.ts ~ line 138 ~ AuthService ~ loginWithRefreshToken ~ error',
              error
            );

            return error;
          }
        ),
        catchError(this.errorHandler)
      );
  }
  errorHandler(error: HttpErrorResponse) {
    console.log(
      '🚀 ~ file: auth.service.ts ~ line 146 ~ AuthService ~ errorHandler ~ error',
      error
    );
    // return Observable.throw(error.message || "server error.");
    return throwError(new Error('Unauthenticated'));
  }
  isLogged(): boolean {
    return localStorage.getItem('session') ? true : false;
  }

  logout() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.refreshToken);
    let rtoken = this.refreshToken;
    return this.http
      .post(HttpApi.userLogout, { refresh_token: rtoken }, { headers: headers })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  logoutUser() {
    this.logout().subscribe(
      (x) => {
        localStorage.clear();

        this.router.navigate(['/splash']);
      },
      (err) => {
        localStorage.clear();
        this.router.navigate(['/splash']);
      }
    );
  }
  get accessToken() {
    let session = localStorage.getItem('session')!;
    let access = JSON.parse(session)?.access?.token;
    return session ? access : null;
  }

  get refreshToken() {
    let session = localStorage.getItem('session')!;
    let refresh = JSON.parse(session)?.refresh?.token;
    return session ? refresh : null;
  }
}
