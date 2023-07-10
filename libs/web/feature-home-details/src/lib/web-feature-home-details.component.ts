import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebFacade } from '@smart-home/web/data-access';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SharedUiFaIconComponent } from '@smart-home/shared/ui-fa-icon';
import {
  faArrowRotateLeft,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AccordionModule } from 'primeng/accordion';
import { DialogService } from 'primeng/dynamicdialog';
import { WebUiRoomDialogComponent } from '@smart-home/web/ui-room-dialog';
import { first } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { StopClickPropagationDirective } from '@smart-home/mobile/shared/util';
import { ButtonModule } from 'primeng/button';
import { WebUiDeviceDialogComponent } from '@smart-home/web/ui-device-dialog';
import { WebUiDeviceFormComponent } from '@smart-home/web/ui-device-form';
import {CreateDevicePayload, DeviceBasePayload} from "@smart-home/shared/device/util-device-payload";
import {WebUiAlarmFormComponent} from "@smart-home/web/ui-alarm-form";
import {CreateAlarmPayload} from "@smart-home/shared/alarm/util-alarm-payload";
import {TableModule} from "primeng/table";
import {WebUiUserDialogComponent} from "@smart-home/web/ui-user-dialog";

@Component({
  selector: 'smart-home-web-feature-home-details',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    SharedUiFaIconComponent,
    AccordionModule,
    StopClickPropagationDirective,
    ButtonModule,
    WebUiDeviceFormComponent,
    WebUiAlarmFormComponent,
    TableModule,
  ],
  templateUrl: './web-feature-home-details.component.html',
  styleUrls: ['./web-feature-home-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [DialogService, ConfirmationService],
})
export class WebFeatureHomeDetailsComponent implements OnInit {
  roomsVm$ = this.stateFacade.roomsVm$;
  alarmVm$ = this.stateFacade.alarmVm$;
  usersVm$ = this.stateFacade.usersVm$;

  readonly ADD_ICON = faPlus;
  readonly DELETE_ICON = faTrash;
  readonly EDIT_ICON = faPenToSquare;
  readonly RESET_ICON = faArrowRotateLeft

  constructor(
    private stateFacade: WebFacade,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.stateFacade.getRooms(this.homeId);
    this.stateFacade.setSelectedHomeId(this.homeId);
    this.stateFacade.getAlarm(this.homeId);
    this.stateFacade.getUsers(this.homeId)
  }

  private get homeId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  onAddRoom() {
    this.dialogService
      .open(WebUiRoomDialogComponent, { header: 'Add room' })
      .onClose.pipe(first())
      .subscribe((name) => {
        if (name) {
          this.stateFacade.createRoom({ name, homeId: this.homeId });
        }
      });
  }

  onUpdateRoom(id: string, name: string) {
    this.dialogService
      .open(WebUiRoomDialogComponent, { header: 'Update room', data: name })
      .onClose.pipe(first())
      .subscribe((name) => {
        this.stateFacade.updateRoom({ name, id });
      });
  }

  onDeleteRoom(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this room?',
      header: 'Delete Confirmation',
      accept: () => this.stateFacade.deleteRoom(id),
    });
  }

  onAddDevice(roomId: string) {
    this.dialogService
      .open(WebUiDeviceDialogComponent, {
        header: 'Add device',
        height: '30rem',
      })
      .onClose.pipe(first())
      .subscribe((payload) => {
        if (payload) this.stateFacade.createDevice({ roomId, ...payload });
      });
  }

  onUpdateDevice(id: string, payload: DeviceBasePayload) {
    this.stateFacade.updateDevice({id, ...payload})
  }

  onDeleteDevice(id: string) {
    this.stateFacade.deleteDevice(id)
  }

  onCreateAlarm(payload: Omit<CreateAlarmPayload, 'homeId'>) {
    this.stateFacade.createAlarm({homeId: this.homeId, ...payload})
  }

  onDeleteAlarm(id: string | undefined) {
    if (!id) return
    this.stateFacade.deleteAlarm(id)
  }

  onAddUser() {
    this.dialogService.open(WebUiUserDialogComponent, {
      header: 'Add user',
    }).onClose.pipe(first()).subscribe((payload: {login: string, name: string}) => {
      if (payload) this.stateFacade.createUser({...payload, homeId: this.homeId, role: 'User'})
    })
  }

  onResetPassword(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reset password?',
      header: 'Reset Confirmation',
      accept: () => this.stateFacade.resetPassword(id),
    })
  }

  onDeleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete user?',
      header: 'Delete Confirmation',
      accept: () => this.stateFacade.deleteUser(id),
    })
  }
}
