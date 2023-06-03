import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { UiSceneCardInterface } from './models/ui-scene-card.interface';
import { ChangeSceneStatePayload } from './models/change-scene-state.payload';
import { IonicModule } from '@ionic/angular';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { SharedUiFaIconComponent } from '@smart-home/shared/ui-fa-icon';
import {
  StopClickPropagationDirective,
  TimePipe,
} from '@smart-home/mobile/shared/util';

@Component({
  selector: 'smart-home-ui-scene-card',
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    NgClass,
    SharedUiFaIconComponent,
    TimePipe,
    StopClickPropagationDirective,
  ],
  templateUrl: './mobile-shared-scene-ui-scene-card.component.html',
  styleUrls: ['./mobile-shared-scene-ui-scene-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedSceneUiSceneCardComponent {
  @Input() scene: UiSceneCardInterface | undefined;
  @Output() changeState = new EventEmitter<ChangeSceneStatePayload>();
  readonly CLOCK_ICON = faClock;

  toggleState() {
    if (!this.scene) return;
    this.changeState.emit({ id: this.scene.id, state: !this.scene.state });
  }
}
