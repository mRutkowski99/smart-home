import { Injectable } from '@angular/core';
import { SceneFacade } from '@smart-home/mobile/scene/data-access';
import { BehaviorSubject, take } from 'rxjs';
import { ControlledDeviceVm } from '@smart-home/shared/scene/util-scene-vm';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';

@Injectable()
export class AddScenePresenter {
  schedule: UpdateSceneSchedulePayload = {
    active: false,
    days: [],
  };
  private devices$ = this.sceneFacade.deviceGroups$;
  private assignedDevices = new BehaviorSubject<ControlledDeviceVm[]>([]);
  assignedDevices$ = this.assignedDevices.asObservable();

  constructor(private sceneFacade: SceneFacade) {}

  get devices(): ControlledDeviceVm[] {
    return this.assignedDevices.getValue();
  }

  updateSchedule(schedule: UpdateSceneSchedulePayload) {
    this.schedule = schedule;
  }

  addDevices(deviceIds: string[]) {
    const devices: ControlledDeviceVm[] = [];
    this.devices$.pipe(take(1)).subscribe((deviceGroups) => {
      deviceIds.forEach((id) => {
        const group = deviceGroups.find((group) =>
          group.devices.some((device) => device.id === id)
        );
        if (!group) return;

        const device = group.devices.find((device) => device.id === id);
        if (!device) return;

        devices.push({
          id: Date.now().toString(),
          deviceId: device.id,
          setpoint: device.setpoint,
          state: device.state,
          deviceName: device.name,
          valueType: device.valueType,
          roomName: group.roomName,
          roomId: '',
        });
      });

      this.assignedDevices.next([
        ...this.assignedDevices.getValue(),
        ...devices,
      ]);
    });
  }

  removeDevice(id: string) {
    this.assignedDevices.next(
      this.assignedDevices.getValue().filter((device) => device.deviceId !== id)
    );
  }

  updateState(id: string, state: boolean) {
    this.assignedDevices.next(
      this.assignedDevices
        .getValue()
        .map((device) =>
          device.deviceId === id ? { ...device, state } : device
        )
    );
  }

  updateSetpoint(id: string, setpoint: number) {
    this.assignedDevices.next(
      this.assignedDevices
        .getValue()
        .map((device) =>
          device.deviceId === id ? { ...device, setpoint } : device
        )
    );
  }
}
