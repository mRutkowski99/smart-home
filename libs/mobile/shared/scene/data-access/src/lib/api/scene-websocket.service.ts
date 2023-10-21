import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { SharedSceneState } from '../state/scene.reducer';
import * as SceneActions from '../state/scene.actions';
import { SceneStartedSocketEvent } from '@smart-home/shared/scene/util-scene-event';

@Injectable()
export class SceneWebsocketService {
  constructor(private socket: Socket, private store: Store<SharedSceneState>) {
    this.registerHandlers();
  }

  private registerHandlers() {
    this.socket.on(SceneStartedSocketEvent.pattern, () =>
      this.store.dispatch(SceneActions.getScenesOverview())
    );
  }
}
