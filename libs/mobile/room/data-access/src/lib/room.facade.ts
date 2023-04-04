import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoomState } from './state/room.reducer';
import { combineLatest, map } from 'rxjs';
import * as Selectors from './state/room.selectors';
import * as Actions from './state/room.actions';

@Injectable()
export class RoomFacade {
  roomDetailsVm$ = combineLatest([
    this.store.select(Selectors.roomDetailsSelector),
    this.store.select(Selectors.roomDetailsStatusSelector),
    this.store.select(Selectors.roomDetailsErrorSelector),
  ]).pipe(map(([room, status, error]) => ({ room, status, error })));

  constructor(private store: Store<RoomState>) {}

  getRoomDetails(roomId: string) {
    this.store.dispatch(Actions.getRoomDetails({ roomId }));
  }
}
