import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonSelect, SelectCustomEvent } from '@ionic/angular';
import { MobileSceneUiSceneScheduleComponent } from '@smart-home/mobile/scene/ui-scene-schedule';
import {
  MobileSceneDataAccessModule,
  SceneFacade,
} from '@smart-home/mobile/scene/data-access';
import { AddScenePresenter } from './mobile-scene-feature-add-scene.presenter';
import {
  MobileSceneUiControlledDevicesListComponent,
  UpdateSetpointPayload,
  UpdateStatePayload,
} from '@smart-home/mobile/scene/ui-controlled-devices-list';
import { FilterAlreadyAssignedDevicesPipe } from '@smart-home/mobile/scene/util';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { combineLatest, distinctUntilChanged, map, Observable, of } from 'rxjs';

@Component({
  selector: 'smart-home-mobile-scene-feature-add-scene',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    MobileSceneUiSceneScheduleComponent,
    MobileSceneDataAccessModule,
    MobileSceneUiControlledDevicesListComponent,
    FilterAlreadyAssignedDevicesPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './mobile-scene-feature-add-scene.component.html',
  styleUrls: ['./mobile-scene-feature-add-scene.component.scss'],
  viewProviders: [AddScenePresenter],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSceneFeatureAddSceneComponent implements OnInit {
  deviceGroups$ = this.sceneFacade.deviceGroups$;
  assignedDevices$ = this.presenter.assignedDevices$;
  @ViewChild(IonSelect) select?: IonSelect;

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  valid$: Observable<boolean> = of(false);

  constructor(
    private sceneFacade: SceneFacade,
    public presenter: AddScenePresenter
  ) {}

  get nameControl(): FormControl<string> {
    return this.form.controls.name;
  }

  ngOnInit() {
    this.sceneFacade.getDeviceGroups();
    this.valid$ = combineLatest([
      this.nameControl.valueChanges.pipe(
        map((val) => val !== ''),
        distinctUntilChanged()
      ),
      this.presenter.assignedDevices$.pipe(
        map((devices) => devices.length > 0)
      ),
    ]).pipe(map(([nameValid, devicesValid]) => nameValid && devicesValid));
  }

  onCreateScene() {
    this.sceneFacade.createScene({
      name: this.nameControl.value,
      schedule: this.presenter.schedule,
      devices: this.presenter.devices,
    });
  }

  onAddDevice(event: Event) {
    this.presenter.addDevices((event as SelectCustomEvent).detail.value);
    if (this.select) this.select.value = null;
  }

  onRemoveDevice(id: string) {
    this.presenter.removeDevice(id);
  }

  onUpdateState(event: UpdateStatePayload) {
    this.presenter.updateState(event.deviceId, event.state);
  }

  onUpdateSetpoint(event: UpdateSetpointPayload) {
    this.presenter.updateSetpoint(event.deviceId, event.setpoint);
  }
}
