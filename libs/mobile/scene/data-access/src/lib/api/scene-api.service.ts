import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiControllerPrefix,
  getControllerUrl,
  UrlFactory,
} from '@smart-home/shared/util';
import { Observable } from 'rxjs';
import { SceneDetailsVm } from '@smart-home/shared/scene/util-scene-vm';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';

@Injectable()
export class SceneApiService {
  private readonly urlFactory = new UrlFactory(
    getControllerUrl(ApiControllerPrefix.Scene)
  );

  constructor(private http: HttpClient) {}

  getSceneDetails(id: string): Observable<SceneDetailsVm> {
    return this.http.get<SceneDetailsVm>(this.urlFactory.getUrl(':id', id));
  }

  updateSchedule(id: string, payload: UpdateSceneSchedulePayload) {
    return this.http.put(
      `${getControllerUrl(ApiControllerPrefix.Scene)}/schedule/${id}`,
      payload
    );
  }
}
