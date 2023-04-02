import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  MobileSharedRoomDataAccessModule,
  SharedRoomFacade,
} from '@smart-home/mobile/shared/room/data-access';
import { roomCardsSkeleton } from '@smart-home/mobile/shared/room/util';
import { MobileSharedRoomUiRoomCardComponent } from '@smart-home/mobile/shared/room/ui-room-card';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MobileSharedSkeletonUiSkeletonCardComponent } from '@smart-home/mobile/shared/skeleton/ui-skeleton-card';
import { MobileSharedUiErrorComponent } from '@smart-home/mobile/shared/ui-error';

@Component({
  selector: 'smart-home-mobile-room-rooms-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    MobileSharedRoomDataAccessModule,
    MobileSharedRoomUiRoomCardComponent,
    MobileSharedSkeletonUiSkeletonCardComponent,
    MobileSharedUiErrorComponent,
  ],
  templateUrl: './mobile-room-feature-rooms-list.component.html',
  styleUrls: ['./mobile-room-feature-rooms-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileRoomRoomsListComponent implements OnInit {
  readonly roomsVm$ = this.roomFacade.roomOverviewVm$;
  readonly roomCardsSkeleton = roomCardsSkeleton(6);

  constructor(private roomFacade: SharedRoomFacade) {}

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.roomFacade.getRoomOverviews();
  }
}
