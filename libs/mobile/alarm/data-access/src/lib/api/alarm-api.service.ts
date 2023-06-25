import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AlarmOverviewVm} from "@smart-home/shared/alarm/util-alarm-vm";
import {HttpClient} from "@angular/common/http";
import {ApiControllerPrefix, getControllerUrl} from "@smart-home/shared/util";

@Injectable()
export class AlarmApiService {
    constructor(private http: HttpClient) {
    }

    getAlarm(): Observable<AlarmOverviewVm | null> {
        return this.http.get<AlarmOverviewVm | null>(getControllerUrl(ApiControllerPrefix.Alarm))
    }

    updateState(id: string, state: boolean) {
        return this.http.put(`${getControllerUrl(ApiControllerPrefix.Alarm)}/${id}/state`, {state})
    }
}