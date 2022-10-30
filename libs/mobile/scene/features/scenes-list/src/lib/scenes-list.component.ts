import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

type Layout = 'slides' | 'grid';

@Component({
  selector: 'smart-home-scenes-list',
  templateUrl: './scenes-list.component.html',
  styleUrls: ['./scenes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenesListComponent implements OnInit {
  @Input() layout: Layout = 'slides';

  constructor() {}

  ngOnInit(): void {}

  scenes = [
    {
      id: 1,
      name: 'Good morning!',
      active: false,
      schedule: '7:00',
      favourite: true,
    },
    {
      id: 2,
      name: 'Bye, bye my home',
      active: false,
      schedule: '8:00',
      favourite: true,
    },
    {
      id: 3,
      name: "I'm coming home!",
      active: false,
      favourite: false,
    },
    {
      id: 4,
      name: 'Netflix & chill',
      active: true,
      favourite: true,
    },
    {
      id: 5,
      name: 'Good night',
      active: false,
      schedule: '23:00',
      favourite: false,
    },
    {
      id: 3,
      name: 'A scene with longer name',
      active: false,
      favourite: true,
    },
  ];
}
