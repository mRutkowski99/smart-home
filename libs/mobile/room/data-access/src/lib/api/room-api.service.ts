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
  private roomControllerUrlFactory = new UrlFactory(
    getControllerUrl(ApiControllerPrefix.Room)
  );

  private deviceControllerUrlFactory = new UrlFactory(
    getControllerUrl(ApiControllerPrefix.Device)
  );

  constructor(private http: HttpClient) {}

  getRoomDetails(id: string): Observable<RoomVm> {
    return this.http.get<RoomVm>(
      this.roomControllerUrlFactory.getUrl(':id', id)
    );
  }

  updateDeviceSetpoint(deviceId: string, value: number) {
    return this.http.put(
      this.deviceControllerUrlFactory.getUrl(':id/setpoint', deviceId),
      {
        value,
      }
    );
  }

  updateDeviceState(deviceId: string, value: boolean) {
    return this.http.put(
      this.deviceControllerUrlFactory.getUrl(':id/state', deviceId),
      {
        value,
      }
    );
  }
}
