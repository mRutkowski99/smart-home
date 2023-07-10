import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {AuthService} from "../auth.service";
import {map, Observable} from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }

    canActivate(): Observable<boolean> {
        return this.authService.profile$.pipe(
            map(profile => profile?.role === 'User')
        )
    }
}