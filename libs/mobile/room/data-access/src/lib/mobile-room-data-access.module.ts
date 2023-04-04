import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ROOM_FEATURE_NAME, roomReducer } from './state/room.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RoomEffects } from './state/room.effects';
import { RoomFacade } from './room.facade';
import { RoomApiService } from './api/room-api.service';

@NgModule({
  imports: [
    StoreModule.forFeature(ROOM_FEATURE_NAME, roomReducer),
    EffectsModule.forFeature([RoomEffects]),
  ],
  providers: [RoomFacade, RoomApiService],
})
export class MobileRoomDataAccessModule {}
