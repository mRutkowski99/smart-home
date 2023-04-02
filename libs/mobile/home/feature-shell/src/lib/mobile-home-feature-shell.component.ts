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
  ],
  templateUrl: './mobile-home-feature-shell.component.html',
  styleUrls: ['./mobile-home-feature-shell.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHomeFeatureShellComponent implements OnInit {
  readonly roomsVm$ = this.roomFacade.roomOverviewVm$;
  readonly roomCardsSkeleton = roomCardsSkeleton(4);

  constructor(private roomFacade: SharedRoomFacade) {}

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.roomFacade.getRoomOverviews();
  }
}
