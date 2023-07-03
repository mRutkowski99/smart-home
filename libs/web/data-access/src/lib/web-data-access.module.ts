import { NgModule } from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {reducer, WEB_FEATURE_KEY} from "./state/reducer";
import {EffectsModule} from "@ngrx/effects";
import {WebEffects} from "./state/effects";
import {WebApiService} from "./api/web-api.service";
import {WebFacade} from "./state/facade";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [StoreModule.forFeature(WEB_FEATURE_KEY, reducer), EffectsModule.forFeature([WebEffects]), HttpClientModule],
  providers: [WebApiService, WebFacade]
})
export class WebDataAccessModule {}
