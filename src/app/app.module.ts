import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './core/http/http.interceptor';
import { Oauth2Interceptor } from './core/http/oauth2.interceptor';
import { HotToastModule } from '@ngneat/hot-toast';
import { MenuServiceService } from './core/services/menu-service.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HotToastModule.forRoot(),
  ],
  providers: [
    MenuServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Oauth2Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
