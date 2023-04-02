import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRoomFeatureRoomsListComponent } from './mobile-room-feature-rooms-list.component';

describe('MobileRoomFeatureRoomsListComponent', () => {
  let component: MobileRoomFeatureRoomsListComponent;
  let fixture: ComponentFixture<MobileRoomFeatureRoomsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRoomFeatureRoomsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRoomFeatureRoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
