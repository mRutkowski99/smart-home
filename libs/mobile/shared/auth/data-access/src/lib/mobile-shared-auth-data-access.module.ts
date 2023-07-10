import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeInterceptor } from './interceptors/home.interceptor';
import {AuthService} from "./auth.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";

@NgModule({
  imports: [CommonModule],
  providers: [
      AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HomeInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class MobileSharedAuthDataAccessModule {}
