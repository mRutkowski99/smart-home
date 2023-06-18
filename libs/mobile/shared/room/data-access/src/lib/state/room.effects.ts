import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoomApiService } from '../api/room-api.service';
import * as RoomActions from './room.actions';
import { fetch } from '@nrwl/angular';
import {catchError, map, of, switchMap} from 'rxjs';

@Injectable()
export class SharedRoomEffects {
    getAllOverview = createEffect(() => this.actions$.pipe(
        ofType(RoomActions.getAllOverview),
        switchMap(a => this.api.getAllOverviews().pipe(
            map(rooms => RoomActions.getAllOverviewSuccess({rooms})),
            catchError(() => of(RoomActions.getAllOverviewFail({error: 'Connection error. Please try again'})))
        ))
    ))
  constructor(private actions$: Actions, private api: RoomApiService) {}
}
