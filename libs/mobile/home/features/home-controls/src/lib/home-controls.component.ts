import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-home-controls',
  templateUrl: './home-controls.component.html',
  styleUrls: ['./home-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeControlsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  roomCards = [
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
}
