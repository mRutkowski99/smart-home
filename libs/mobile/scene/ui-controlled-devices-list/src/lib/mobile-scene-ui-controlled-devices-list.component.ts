import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlledDeviceVm } from '@smart-home/shared/scene/util-scene-vm';
import { IonicModule } from '@ionic/angular';
import { MobileSharedDeviceUiDeviceCardComponent } from '@smart-home/mobile/shared/device/ui-device-card';
import { ControlledDevicesPresenter } from './mobile-scene-ui-controlled-devices-list.presenter';
import { DeviceControlFacade } from '@smart-home/mobile/shared/device/ui-device-control-modal';
import { getDeviceValueControlModalPayload } from '@smart-home/mobile/shared/device/util';

export interface UpdateStatePayload {
  deviceId: string;
  state: boolean;
}

export interface UpdateSetpointPayload {
  deviceId: string;
  setpoint: number;
}

@Component({
  selector: 'smart-home-controlled-devices-list',
  standalone: true,
  imports: [CommonModule, IonicModule, MobileSharedDeviceUiDeviceCardComponent],
  providers: [DeviceControlFacade],
  templateUrl: './mobile-scene-ui-controlled-devices-list.component.html',
  styleUrls: ['./mobile-scene-ui-controlled-devices-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ControlledDevicesPresenter],
})
export class MobileSceneUiControlledDevicesListComponent {
  groupedDeviceCards$ = this.presenter.groupedDeviceCards$;
  @Output() updateState = new EventEmitter<{
    newState: UpdateStatePayload;
    state: UpdateStatePayload;
  }>();
  @Output() updateSetpoint = new EventEmitter<{
    newSetpoint: UpdateSetpointPayload;
    setpoint: UpdateSetpointPayload;
  }>();
  @Output() removeDevice = new EventEmitter<{
    deviceId: string;
    device: ControlledDeviceVm;
  }>();

  constructor(
    private presenter: ControlledDevicesPresenter,
    private deviceControlFacade: DeviceControlFacade
  ) {}

  @Input() set controlledDevices(devices: ControlledDeviceVm[]) {
    this.presenter.updateDevicesCollection(devices);
  }

  onUpdateState(state: boolean, deviceId: string) {
    this.updateState.emit({
      newState: { state, deviceId },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state: { deviceId, state: this.presenter.getDeviceState(deviceId)! },
    });
  }

  onShowSetpointModal(deviceId: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const device = this.presenter.getDevice(deviceId)!;
    this.deviceControlFacade
      .openModal(
        getDeviceValueControlModalPayload({
          id: device.id,
          setpoint: device.setpoint,
          valueType: device.valueType,
          state: device.state,
          name: device.deviceName,
        })
      )
      .subscribe((response) => {
        if (response)
          this.updateSetpoint.emit({
            newSetpoint: { setpoint: response, deviceId },
            setpoint: {
              deviceId,
              setpoint: device.setpoint,
            },
          });
      });
  }

  onRemove(deviceId: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.removeDevice.emit({
      deviceId,
      device: this.presenter.getDevice(deviceId)!,
    });
  }
}
