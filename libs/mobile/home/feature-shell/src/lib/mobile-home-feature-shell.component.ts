import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MobileSharedUiSliderComponent } from '@smart-home/mobile/shared/ui-slider';
import {
  MobileSharedRoomDataAccessModule,
  SharedRoomFacade,
} from '@smart-home/mobile/shared/room/data-access';
import { MobileSharedRoomUiRoomCardComponent } from '@smart-home/mobile/shared/room/ui-room-card';
import { roomCardsSkeleton } from '@smart-home/mobile/shared/room/util';
import { MobileSharedSkeletonUiSkeletonCardComponent } from '@smart-home/mobile/shared/skeleton/ui-skeleton-card';
import { MobileSharedUiErrorComponent } from '@smart-home/mobile/shared/ui-error';
import {
  MobileSharedSceneDataAccessModule,
  SharedSceneFacade,
} from '@smart-home/mobile/shared/scene/data-access';
import { MobileSharedSceneUiSceneCardComponent, ChangeSceneStatePayload } from '@smart-home/mobile/shared/scene/ui-scene-card';
import { sceneCardsSkeleton } from '@smart-home/mobile/shared/scene/util';
import { RouterLink } from '@angular/router';
import { MainRoutes } from '@smart-home/mobile/shared/util';
import {MobileSharedDeviceDataAccessModule, SharedDeviceFacade} from "@smart-home/mobile/shared/device/data-access";
import {MobileSharedDeviceUiDeviceCardComponent} from "@smart-home/mobile/shared/device/ui-device-card";
import {DeviceControlFacade} from "@smart-home/mobile/shared/device/ui-device-control-modal";
import {RoomDevice} from "@smart-home/shared/room/util-room-vm";
import {getDeviceValueControlModalPayload} from "@smart-home/mobile/shared/device/util";
import {DeviceVm} from "@smart-home/shared/device/util-device-vm";

@Component({
  selector: 'smart-home-mobile-home-feature-shell',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    MobileSharedUiSliderComponent,
    MobileSharedRoomDataAccessModule,
    MobileSharedRoomUiRoomCardComponent,
    MobileSharedSkeletonUiSkeletonCardComponent,
    MobileSharedUiErrorComponent,
    MobileSharedSceneDataAccessModule,
    MobileSharedSceneUiSceneCardComponent,
    RouterLink,
    MobileSharedDeviceDataAccessModule,
    MobileSharedDeviceUiDeviceCardComponent
  ],
  providers: [DeviceControlFacade],
  templateUrl: './mobile-home-feature-shell.component.html',
  styleUrls: ['./mobile-home-feature-shell.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHomeFeatureShellComponent implements OnInit {
  readonly roomsVm$ = this.roomFacade.roomOverviewVm$;
  readonly roomCardsSkeleton = roomCardsSkeleton(4);
  readonly roomRoute = MainRoutes.Rooms;
  readonly scenesVm$ = this.scenesFacade.scenesOverviewVm$;
  readonly sceneCardsSkeleton = sceneCardsSkeleton(4);
  readonly sceneRoute = MainRoutes.Scenes;
  readonly deviceVm$ = this.deviceFacade.deviceVm$

  constructor(
    private roomFacade: SharedRoomFacade,
    private scenesFacade: SharedSceneFacade,
    private deviceFacade: SharedDeviceFacade,
    private deviceControlFacade: DeviceControlFacade
  ) {}

  ngOnInit() {
    this.getRooms();
    this.getScenes();
    this.getDevices()
  }

  getRooms() {
    this.roomFacade.getRoomOverviews();
  }

  getScenes() {
    this.scenesFacade.getScenesOverview();
  }

  getDevices() {
    this.deviceFacade.getDevices()
  }

  onChangeSceneState(event: ChangeSceneStatePayload) {
    this.scenesFacade.updateSceneState(event.id, event.state)
  }

  onChangeDeviceState(state: boolean, id: string) {
    this.deviceFacade.updateDeviceState(id, state)
  }

  onSelectDevice(id: string) {
    this.deviceFacade.getDeviceById(id).subscribe(device => {
      if (!device) return
      this.openDeviceControlModal(device)
    })
  }

  private openDeviceControlModal(device: DeviceVm) {
    if (device.valueType !== 'PERCENT' && device.valueType !== 'TEMPERATURE')
      return;

    this.deviceControlFacade
        .openModal(getDeviceValueControlModalPayload(device))
        .subscribe((response) => {
          if (response === null) return;
          this.deviceFacade.updateDeviceSetpoint(
              device.id,
              device.setpoint,
              response
          );
        });
  }
}
