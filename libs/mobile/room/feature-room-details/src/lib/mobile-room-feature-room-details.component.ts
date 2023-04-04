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

@Component({
  selector: 'smart-home-feature-room-details',
  standalone: true,
  imports: [AsyncPipe, NgIf, MobileRoomDataAccessModule, IonicModule],
  templateUrl: './mobile-room-feature-room-details.component.html',
  styleUrls: ['./mobile-room-feature-room-details.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileRoomFeatureRoomDetailsComponent implements OnInit {
  readonly roomDetailsVm$ = this.roomFacade.roomDetailsVm$;

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
