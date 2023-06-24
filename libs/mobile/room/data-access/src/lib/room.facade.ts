import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoomState } from './state/room.reducer';
import { combineLatest, first, map, Observable } from 'rxjs';
import * as Selectors from './state/room.selectors';
import * as Actions from './state/room.actions';
import { RoomDevice } from '@smart-home/shared/room/util-room-vm';
import {RoomSocketService} from "./api/room-socket.service";

@Injectable()
export class RoomFacade {
  roomDetailsVm$ = combineLatest([
    this.store.select(Selectors.roomDetailsSelector),
    this.store.select(Selectors.roomDetailsStatusSelector),
    this.store.select(Selectors.roomDetailsErrorSelector),
  ]).pipe(map(([room, status, error]) => ({ room, status, error })));

  constructor(private store: Store<RoomState>, private socket: RoomSocketService) {}

  private socketSubscription = this.socket.events$.subscribe(console.log)

  getRoomDetails(roomId: string) {
    this.store.dispatch(Actions.getRoomDetails({ roomId }));
  }

  getRoomDeviceById(id: string): Observable<RoomDevice | null> {
    return this.store.select(Selectors.roomDeviceSelector(id)).pipe(first());
  }

  updateDeviceSetpoint(deviceId: string, value: number, newValue: number) {
    this.store.dispatch(
      Actions.updateDeviceSetpoint({ deviceId, value, newValue })
    );
  }

  updateDeviceState(deviceId: string, value: boolean) {
    this.store.dispatch(Actions.updateDeviceState({ deviceId, value }));
  }
}
