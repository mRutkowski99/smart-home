import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { roomReducer, SHARED_ROOM_FEATURE_NAME } from './state/room.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedRoomEffects } from './state/room.effects';
import { SharedRoomFacade } from './shared-room.facade';
import { RoomApiService } from './api/room-api.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(SHARED_ROOM_FEATURE_NAME, roomReducer),
    EffectsModule.forFeature([SharedRoomEffects]),
  ],
  providers: [SharedRoomFacade, RoomApiService],
})
export class MobileSharedRoomDataAccessModule {}
