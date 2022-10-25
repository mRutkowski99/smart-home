import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IconUtil } from '@smart-home/shared/utils/fa-icon';

@Component({
  selector: 'smart-home-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  readonly arrowIcon = IconUtil.arrowRigth;

  rooms = [
    {
      id: 1,
      name: 'Living room',
      devices: 5,
      img: 'https://images.unsplash.com/photo-1623920996377-9c5cd536143e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      temperature: 25,
    },
    {
      id: 1,
      name: 'Living room',
      devices: 5,
      img: 'https://images.unsplash.com/photo-1623920996377-9c5cd536143e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      temperature: 25,
    },
    {
      id: 1,
      name: 'Living room',
      devices: 5,
      img: 'https://images.unsplash.com/photo-1623920996377-9c5cd536143e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      temperature: 25,
    },
    {
      id: 1,
      name: 'Living room',
      devices: 5,
      img: 'https://images.unsplash.com/photo-1623920996377-9c5cd536143e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      temperature: 25,
    },
  ];

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
