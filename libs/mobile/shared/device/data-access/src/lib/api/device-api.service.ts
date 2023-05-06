import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiControllerPrefix,
  getControllerUrl,
  UrlFactory,
} from '@smart-home/shared/util';

@Injectable()
export class DeviceApiService {
  private urlFactory = new UrlFactory(
    getControllerUrl(ApiControllerPrefix.Device)
  );

  constructor(private http: HttpClient) {}

  updateDeviceSetpoint(deviceId: string, value: number) {
    return this.http.post(this.urlFactory.getUrl(':id/setpoint', deviceId), {
      value,
    });
  }

  updateDeviceState(deviceId: string, value: boolean) {
    return this.http.post(this.urlFactory.getUrl(':id/state', deviceId), {
      value,
    });
  }
}
