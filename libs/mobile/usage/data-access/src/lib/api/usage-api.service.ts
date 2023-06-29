import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiControllerPrefix, getControllerUrl, Period} from "@smart-home/shared/util";
import {Observable} from "rxjs";
import {UsageVm} from "@smart-home/shared/usage/util-usage-vm";

@Injectable()
export class UsageApiService {
    constructor(private http: HttpClient) {
    }

    getUsage(period: Period): Observable<UsageVm | null> {
        const params = new HttpParams().append('period', period)
        return this.http.get(getControllerUrl(ApiControllerPrefix.Usage), {params})
    }
}