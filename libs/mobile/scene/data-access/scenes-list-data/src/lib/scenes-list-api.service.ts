import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SceneOverviewDto } from '@smart-home/shared/dto';
import { ApiUrlUtil } from '@smart-home/shared/utils';

@Injectable()
export class ScenesListApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = ApiUrlUtil.sceneController;

  getScenes(homeId: string): Observable<SceneOverviewDto[]> {
    return this.http.get<SceneOverviewDto[]>(this.url + 'overviews/' + homeId);
  }
}
