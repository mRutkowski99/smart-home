import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedRoomUiRoomCardComponent } from './mobile-shared-room-ui-room-card.component';

describe('MobileSharedRoomUiRoomCardComponent', () => {
  let component: MobileSharedRoomUiRoomCardComponent;
  let fixture: ComponentFixture<MobileSharedRoomUiRoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedRoomUiRoomCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSharedRoomUiRoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
