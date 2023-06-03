import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiControllerPrefix,
  getControllerUrl,
  UrlFactory,
} from '@smart-home/shared/util';
import { Observable } from 'rxjs';
import { SceneOverviewVm } from '@smart-home/shared/scene/util-scene-vm';

@Injectable()
export class SceneApiService {
  private url = getControllerUrl(ApiControllerPrefix.Scene);
  private urlFactory = new UrlFactory(this.url);

  constructor(private http: HttpClient) {}

  getScenesOverview(): Observable<SceneOverviewVm[]> {
    return this.http.get<SceneOverviewVm[]>(this.urlFactory.getUrl('overview'));
  }

  updateSceneState(id: string, state: boolean) {
    return this.http.put(this.urlFactory.getUrl(':id/state', id), { state });
  }
}
