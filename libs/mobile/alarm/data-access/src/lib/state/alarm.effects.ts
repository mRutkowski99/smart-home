import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AlarmApiService} from "../api/alarm-api.service";
import {AlarmActions} from "./alarm.actions";
import {catchError, map, of, switchMap} from "rxjs";

@Injectable()
export class AlarmEffects {
    constructor(private actions$: Actions, private api: AlarmApiService) {
    }

    getAlarm$ = createEffect(() => this.actions$.pipe(
        ofType(AlarmActions.getAlarm),
        switchMap(() => this.api.getAlarm().pipe(
            map(alarm => AlarmActions.getAlarmSuccess({alarm})),
            catchError(() => of(AlarmActions.getAlarmFail({error: 'Failed to fetch'})))
        ))
    ))

    updateAlarmState$ = createEffect(() => this.actions$.pipe(
        ofType(AlarmActions.updateAlarmState),
        switchMap(action => this.api.updateState(action.id, action.value).pipe(
            map(() => AlarmActions.updateAlarmStateSuccess()),
            catchError(() => of(AlarmActions.undoUpdateAlarmState({id: action.id, value: !action.value})))
        ))
    ))
}