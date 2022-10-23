import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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
    },
    {
      id: 2,
      name: 'Bye, bye my home',
      active: false,
    },
    {
      id: 3,
      name: "I'm coming home!",
      active: false,
    },
    {
      id: 4,
      name: 'Netflix & chill',
      active: true,
    },
    {
      id: 5,
      name: 'Good night',
      active: false,
    },
    {
      id: 3,
      name: 'A scene with longer name',
      active: false,
    },
  ];
}
