import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MobileRoomDataAccessModule,
  RoomFacade,
} from '@smart-home/mobile/room/data-access';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MobileRoomUiIconCardComponent } from '@smart-home/mobile/room/ui-icon-card';
import {
  DeviceSetpointPipe,
  PercentPipe,
  TemperaturePipe,
} from '@smart-home/mobile/shared/util';
import { faDroplet, faTemperature2 } from '@fortawesome/free-solid-svg-icons';
import { RoomDevice } from '@smart-home/shared/room/util-room-vm';
import { DeviceControlFacade } from '@smart-home/mobile/shared/device/ui-device-control-modal';
import { getDeviceValueControlModalPayload } from '@smart-home/mobile/shared/device/util';
import { MobileSharedDeviceUiDeviceCardComponent } from '@smart-home/mobile/shared/device/ui-device-card';

@Component({
  selector: 'smart-home-feature-room-details',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    MobileRoomDataAccessModule,
    IonicModule,
    MobileRoomUiIconCardComponent,
    MobileSharedDeviceUiDeviceCardComponent,
    TemperaturePipe,
    PercentPipe,
    DeviceSetpointPipe,
  ],
  providers: [DeviceControlFacade],
  templateUrl: './mobile-room-feature-room-details.component.html',
  styleUrls: ['./mobile-room-feature-room-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileRoomFeatureRoomDetailsComponent implements OnInit {
  readonly roomDetailsVm$ = this.roomFacade.roomDetailsVm$;
  readonly TEMPERATURE_ICON = faTemperature2;
  readonly HUMIDITY_ICON = faDroplet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomFacade: RoomFacade,
    private deviceControlFacade: DeviceControlFacade
  ) {}

  private get roomId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit() {
    this.getRoomDetails();
  }

  getRoomDetails() {
    this.roomFacade.getRoomDetails(this.roomId);
  }

  onSelectDevice(id: string) {
    this.roomFacade.getRoomDeviceById(id).subscribe((device) => {
      if (!device) return;
      this.openDeviceControlModal(device);
    });
  }

  onToggleDeviceState(state: boolean, id: string) {
    this.roomFacade.updateDeviceState(id, state);
  }

  private openDeviceControlModal(device: RoomDevice) {
    if (device.valueType !== 'PERCENT' && device.valueType !== 'TEMPERATURE')
      return;

    this.deviceControlFacade
      .openModal(getDeviceValueControlModalPayload(device))
      .subscribe((response) => {
        if (response === null) return;
        this.roomFacade.updateDeviceSetpoint(
          device.id,
          device.setpoint,
          response
        );
      });
  }
}
