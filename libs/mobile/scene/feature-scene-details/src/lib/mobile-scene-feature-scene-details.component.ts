import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MobileSceneDataAccessModule,
  SceneEventBus,
  SceneFacade,
} from '@smart-home/mobile/scene/data-access';
import { ActivatedRoute } from '@angular/router';
import { MobileSceneUiSceneScheduleComponent } from '@smart-home/mobile/scene/ui-scene-schedule';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';
import { first, map } from 'rxjs';

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
    private eventBus: SceneEventBus,
    private activatedRoute: ActivatedRoute
  ) {}

  private get sceneId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit() {
    this.sceneFacade.getSceneDetails(this.sceneId);
  }

  onScheduleUpdate(event: UpdateSceneSchedulePayload) {
    this.sceneDetailsVm$
      .pipe(
        first(),
        map((vm) => vm.scene)
      )
      .subscribe((scene) => {
        if (!scene || !scene.schedule) return;
        this.sceneFacade.updateSchedule(this.sceneId, event, {
          active: scene.schedule.active,
          days: scene.schedule.days,
        });
      });
  }
}
