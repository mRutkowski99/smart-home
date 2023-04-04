import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRoomFeatureRoomDetailsComponent } from './mobile-room-feature-room-details.component';

describe('MobileRoomFeatureRoomDetailsComponent', () => {
  let component: MobileRoomFeatureRoomDetailsComponent;
  let fixture: ComponentFixture<MobileRoomFeatureRoomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRoomFeatureRoomDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRoomFeatureRoomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
