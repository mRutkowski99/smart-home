import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, switchMap, tap} from "rxjs";
import {AuthorizedUser} from "@smart-home/shared/user/util-user-vm";
import {Router} from "@angular/router";
import {ApiControllerPrefix, getControllerUrl} from "@smart-home/shared/util";

@Injectable()
export class AuthService {
    private _profile = new BehaviorSubject<AuthorizedUser | null>(null)
    profile$ = this._profile.asObservable()

    constructor(private http: HttpClient, private router: Router) {
    }

    login(username: string, password: string) {
        this.http.post<{access_token: string}>(getControllerUrl(ApiControllerPrefix.Auth), {username, password})
            .pipe(
                tap(res => localStorage.setItem('token', res.access_token)),
                switchMap(() => this.http.get<AuthorizedUser | null>(getControllerUrl(ApiControllerPrefix.Auth)))
            )
            .subscribe((profile) => {
                this._profile.next(profile)
                this.router.navigate(['../', 'home'])
            })
    }

    logout() {
        localStorage.removeItem('token')
        this._profile.next(null)
        this.router.navigate(['../', 'login'])
    }
}