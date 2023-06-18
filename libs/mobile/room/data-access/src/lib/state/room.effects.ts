import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoomApiService } from '../api/room-api.service';
import * as RoomActions from './room.actions';
import {catchError, map, of, switchMap} from 'rxjs';

@Injectable()
export class RoomEffects {
    getRoomDetails = createEffect(() => this.actions$.pipe(
        ofType(RoomActions.getRoomDetails),
        switchMap(a => this.roomApi.getRoomDetails(a.roomId).pipe(
            map(roomDetails => RoomActions.getRoomDetailsSuccess({roomDetails})),
            catchError(() => of(RoomActions.getRoomDetailsFail({error: 'Connection error. Please try again'})))
        ))
    ))

    updateDeviceSetpoint = createEffect(() => this.actions$.pipe(
        ofType(RoomActions.updateDeviceSetpoint),
        switchMap(a => this.roomApi.updateDeviceSetpoint(a.deviceId, a.newValue).pipe(
            map(() => RoomActions.updateDeviceSetpointSuccess()),
            catchError(() => of(RoomActions.undoUpdateDeviceSetpoint({deviceId: a.deviceId, value: a.value})))
        ))
    ))

    updateDeviceState = createEffect(() => this.actions$.pipe(
        ofType(RoomActions.updateDeviceState),
        switchMap(a => this.roomApi.updateDeviceState(a.deviceId, a.value).pipe(
            map(() => RoomActions.updateDeviceStateSuccess()),
            catchError(() => of(RoomActions.undoUpdateDeviceState({deviceId: a.deviceId, value: !a.value})))
        ))
    ))


  constructor(private actions$: Actions, private roomApi: RoomApiService) {}
}
