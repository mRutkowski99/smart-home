import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRoomUiIconCardComponent } from './mobile-room-ui-icon-card.component';

describe('MobileRoomUiIconCardComponent', () => {
  let component: MobileRoomUiIconCardComponent;
  let fixture: ComponentFixture<MobileRoomUiIconCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRoomUiIconCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileRoomUiIconCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
