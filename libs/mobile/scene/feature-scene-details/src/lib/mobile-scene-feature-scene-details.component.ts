import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MobileSceneDataAccessModule,
  SceneEventBus,
  SceneFacade,
} from '@smart-home/mobile/scene/data-access';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MobileSceneUiSceneScheduleComponent } from '@smart-home/mobile/scene/ui-scene-schedule';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';
import { first, map, Observable } from 'rxjs';
import {
  MobileSceneUiControlledDevicesListComponent,
  UpdateSetpointPayload,
  UpdateStatePayload,
} from '@smart-home/mobile/scene/ui-controlled-devices-list';
import {
  ControlledDeviceVm,
  SceneDetailsVm,
} from '@smart-home/shared/scene/util-scene-vm';
import { IonicModule, IonSelect, SelectCustomEvent } from '@ionic/angular';
import { SharedUiFaIconComponent } from '@smart-home/shared/ui-fa-icon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterAlreadyAssignedDevicesPipe } from '../../../util/src/lib/filter-already-assigned-devices.pipe';

@Component({
  selector: 'smart-home-mobile-scene-feature-scene-details',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    MobileSceneDataAccessModule,
    MobileSceneUiSceneScheduleComponent,
    MobileSceneUiControlledDevicesListComponent,
    SharedUiFaIconComponent,
    RouterLink,
    FilterAlreadyAssignedDevicesPipe,
  ],
  templateUrl: './mobile-scene-feature-scene-details.component.html',
  styleUrls: ['./mobile-scene-feature-scene-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSceneFeatureSceneDetailsComponent implements OnInit {
  readonly sceneDetailsVm$ = this.sceneFacade.sceneDetailsVm$;
  readonly deviceGroups$ = this.sceneFacade.deviceGroups$;
  readonly ADD_ICON = faPlus;
  @ViewChild(IonSelect) select?: IonSelect;

  constructor(
    private sceneFacade: SceneFacade,
    private eventBus: SceneEventBus,
    private activatedRoute: ActivatedRoute
  ) {}

  private get sceneId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  private get scene$(): Observable<SceneDetailsVm | null> {
    return this.sceneDetailsVm$.pipe(
      first(),
      map((vm) => vm.scene)
    );
  }

  ngOnInit() {
    this.sceneFacade.getSceneDetails(this.sceneId);
    this.sceneFacade.getDeviceGroups();
  }

  onScheduleUpdate(event: UpdateSceneSchedulePayload) {
    this.scene$.subscribe((scene) => {
      if (!scene || !scene.schedule) return;
      this.sceneFacade.updateSchedule(this.sceneId, event, {
        active: scene.schedule.active,
        days: scene.schedule.days,
      });
    });
  }

  onUpdateState(event: {
    newState: UpdateStatePayload;
    state: UpdateStatePayload;
  }) {
    this.sceneFacade.updateControlledDeviceState(
      { ...event.newState, sceneId: this.sceneId },
      { ...event.state, sceneId: this.sceneId }
    );
  }

  onUpdateSetpoint(event: {
    newSetpoint: UpdateSetpointPayload;
    setpoint: UpdateSetpointPayload;
  }) {
    this.sceneFacade.updateControlledDeviceSetpoint(
      { ...event.newSetpoint, sceneId: this.sceneId },
      { ...event.setpoint, sceneId: this.sceneId }
    );
  }

  onRemoveDevice(event: { deviceId: string; device: ControlledDeviceVm }) {
    this.sceneFacade.removeControlledDevice(
      this.sceneId,
      event.deviceId,
      event.device
    );
  }

  onAddDevice(event: Event) {
    this.sceneFacade.addControlledDevice(
      this.sceneId,
      (event as SelectCustomEvent).detail.value
    );

    if (this.select) this.select.value = null;
  }
}
