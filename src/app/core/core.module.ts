import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Oauth2Interceptor } from './http/oauth2.interceptor';
import { AppInterceptor } from './http/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  exports: [FormsModule, ReactiveFormsModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
