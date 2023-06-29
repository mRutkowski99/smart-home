import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UsageApiService} from "../api/usage-api.service";
import {usageActions} from "./usage.actions";
import {catchError, map, of, switchMap} from "rxjs";

@Injectable()
export class UsageEffects {
    constructor(private actions$: Actions, private api: UsageApiService) {
    }

    getUsage$ = createEffect(() => this.actions$.pipe(
        ofType(usageActions.getUsage),
        switchMap(action => this.api.getUsage(action.period).pipe(
            map(usage => usageActions.getUsageSuccess({usage})),
            catchError(() => of(usageActions.getUsageFail({error: 'Failed to fetch'})))
        ))
    ))
}