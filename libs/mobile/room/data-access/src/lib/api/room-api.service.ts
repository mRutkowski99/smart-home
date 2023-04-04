import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiControllerPrefix,
  getControllerUrl,
  UrlFactory,
} from '@smart-home/shared/util';
import { Observable } from 'rxjs';
import { RoomVm } from '@smart-home/shared/room/util-room-vm';

@Injectable()
export class RoomApiService {
  private urlFactory = new UrlFactory(
    getControllerUrl(ApiControllerPrefix.Room)
  );

  constructor(private http: HttpClient) {}

  getRoomDetails(id: string): Observable<RoomVm> {
    return this.http.get<RoomVm>(this.urlFactory.getUrl(':id', id));
  }
}
