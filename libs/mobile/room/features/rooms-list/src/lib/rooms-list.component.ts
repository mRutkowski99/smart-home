import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RoomsListComponentStore } from '@smart-home/mobile/room/data-access/rooms-list-data';

type Layout = 'slides' | 'grid';

@Component({
  selector: 'smart-home-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit {
  @Input() layout: Layout = 'slides';

  constructor(private readonly store: RoomsListComponentStore) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.getRooms();
  }
}
