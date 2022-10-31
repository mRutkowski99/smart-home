import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { combineLatest, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { SceneOverviewDto } from '@smart-home/shared/dto';
import { GenericState, StoreUtils } from '@smart-home/shared/utils';
import { ScenesListApiService } from './scenes-list-api.service';
import { HttpErrorResponse } from '@angular/common/http';

interface State extends GenericState<SceneOverviewDto[]> {}

//todo: Get from auth store
const homeId = '8feb19a0-531c-475e-8a91-4257d96e08b9';

@Injectable()
export class ScenesListComponentStore extends ComponentStore<State> {
  // Selectors
  readonly vm$ = combineLatest([
    this.select((state) => state.data),
    this.select((state) => state.error),
    this.select((state) => state.status),
    this.select(
      (state) => state.status === 'success' && state.data?.length === 0
    ),
  ]).pipe(
    map(([scenes, error, status, noContent]) => ({
      scenes,
      error,
      status,
      noContent,
    }))
  );

  // Effects
  readonly getScenes = this.effect<void>((_) => {
    return _.pipe(
      tap(() => this.patchState(StoreUtils.loadingState())),
      withLatestFrom(of(homeId)),
      switchMap(([_, homeId]) =>
        this.api.getScenes(homeId).pipe(
          tapResponse(
            (scenes) => this.patchState(StoreUtils.successState(scenes)),
            (error: HttpErrorResponse) =>
              this.patchState(StoreUtils.errorState(error.message))
          )
        )
      )
    );
  });

  constructor(private readonly api: ScenesListApiService) {
    super({
      data: null,
      error: null,
      status: 'loading',
    });
  }
}
