import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FEATURE_NAME, roomReducer } from './state/room.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedRoomEffects } from './state/room.effects';
import { SharedRoomFacade } from './shared-room.facade';
import { RoomApiService } from './api/room-api.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_NAME, roomReducer),
    EffectsModule.forFeature([SharedRoomEffects]),
  ],
  providers: [SharedRoomFacade, RoomApiService],
})
export class MobileSharedRoomDataAccessModule {}
