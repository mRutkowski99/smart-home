import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MobileRoomDataAccessModule,
  RoomFacade,
} from '@smart-home/mobile/room/data-access';
import { AsyncPipe, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MobileRoomUiIconCardComponent } from '@smart-home/mobile/room/ui-icon-card';
import { HumidityPipe, TemperaturePipe } from '@smart-home/mobile/shared/util';
import { faDroplet, faTemperature2 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'smart-home-feature-room-details',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MobileRoomDataAccessModule,
    IonicModule,
    MobileRoomUiIconCardComponent,
    TemperaturePipe,
    HumidityPipe,
  ],
  templateUrl: './mobile-room-feature-room-details.component.html',
  styleUrls: ['./mobile-room-feature-room-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileRoomFeatureRoomDetailsComponent implements OnInit {
  readonly roomDetailsVm$ = this.roomFacade.roomDetailsVm$;
  readonly TEMPERATURE_ICON = faTemperature2;
  readonly HUMIDITY_ICON = faDroplet;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomFacade: RoomFacade
  ) {}

  private get roomId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit() {
    this.getRoomDetails();
  }

  getRoomDetails() {
    this.roomFacade.getRoomDetails(this.roomId);
  }
}
