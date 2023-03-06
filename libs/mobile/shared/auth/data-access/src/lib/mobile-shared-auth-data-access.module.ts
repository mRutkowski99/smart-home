import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeInterceptor } from './interceptors/home.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HomeInterceptor, multi: true },
  ],
})
export class MobileSharedAuthDataAccessModule {}
