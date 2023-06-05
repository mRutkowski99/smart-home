import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MobileSceneDataAccessModule,
  SceneFacade,
} from '@smart-home/mobile/scene/data-access';
import { ActivatedRoute } from '@angular/router';
import { MobileSceneUiSceneScheduleComponent } from '@smart-home/mobile/scene/ui-scene-schedule';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';

@Component({
  selector: 'smart-home-mobile-scene-feature-scene-details',
  standalone: true,
  imports: [
    CommonModule,
    MobileSceneDataAccessModule,
    MobileSceneUiSceneScheduleComponent,
  ],
  templateUrl: './mobile-scene-feature-scene-details.component.html',
  styleUrls: ['./mobile-scene-feature-scene-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSceneFeatureSceneDetailsComponent implements OnInit {
  readonly sceneDetailsVm$ = this.sceneFacade.sceneDetailsVm$;

  constructor(
    private sceneFacade: SceneFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  private get sceneId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit() {
    this.sceneFacade.getSceneDetails(this.sceneId);
  }

  onScheduleUpdate(event: UpdateSceneSchedulePayload) {}
}
