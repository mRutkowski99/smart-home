import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiControllerPrefix,
  getControllerUrl,
} from '@smart-home/shared/util-constants';
import { Observable } from 'rxjs';
import { RoomOverviewVm } from '@smart-home/shared/room/util-room-vm';

@Injectable()
export class RoomApiService {
  private url = getControllerUrl(ApiControllerPrefix.Room);

  constructor(private http: HttpClient) {}

  getAllOverviews(): Observable<RoomOverviewVm[]> {
    return this.http.get<RoomOverviewVm[]>(this.url + '/overview');
  }
}
