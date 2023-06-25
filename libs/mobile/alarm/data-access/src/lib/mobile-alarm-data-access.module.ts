import { NgModule } from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {ALARM_FEATURE_KEY, alarmReducer} from "./state/alarm.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AlarmEffects} from "./state/alarm.effects";
import {AlarmApiService} from "./api/alarm-api.service";
import {AlarmFacade} from "./alarm.facade";

@NgModule({
  imports: [StoreModule.forFeature(ALARM_FEATURE_KEY, alarmReducer), EffectsModule.forFeature([AlarmEffects])],
  providers: [AlarmApiService, AlarmFacade]
})
export class MobileAlarmDataAccessModule {}
