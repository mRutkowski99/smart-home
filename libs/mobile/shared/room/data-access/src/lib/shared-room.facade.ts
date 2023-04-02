import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedRoomState } from './state/room.reducer';
import { combineLatest, map } from 'rxjs';
import * as Selectors from './state/room.selectors';
import * as Actions from './state/room.actions';

@Injectable()
export class SharedRoomFacade {
  roomOverviewVm$ = combineLatest([
    this.store.select(Selectors.roomOverviewSelector),
    this.store.select(Selectors.statusSelector),
    this.store.select(Selectors.errorSelector),
  ]).pipe(map(([rooms, status, error]) => ({ rooms, status, error })));

  constructor(private store: Store<SharedRoomState>) {}

  getRoomOverviews() {
    this.store.dispatch(Actions.getAllOverview());
  }
}
