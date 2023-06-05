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
import { MobileSharedSceneUiSceneCardComponent } from '@smart-home/mobile/shared/scene/ui-scene-card';
import { sceneCardsSkeleton } from '@smart-home/mobile/shared/scene/util';
import { RouterLink } from '@angular/router';
import { MainRoutes } from '@smart-home/mobile/shared/util';

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
  ],
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

  constructor(
    private roomFacade: SharedRoomFacade,
    private scenesFacade: SharedSceneFacade
  ) {}

  ngOnInit() {
    this.getRooms();
    this.getScenes();
  }

  getRooms() {
    this.roomFacade.getRoomOverviews();
  }

  getScenes() {
    this.scenesFacade.getScenesOverview();
  }
}
