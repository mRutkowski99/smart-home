import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../api/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.profile$.pipe(
      map((profile) => profile?.role === 'Admin')
    );
  }
}
