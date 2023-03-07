import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRoomUiRoomCardComponent } from './shared-room-ui-room-card.component';

describe('SharedRoomUiRoomCardComponent', () => {
  let component: SharedRoomUiRoomCardComponent;
  let fixture: ComponentFixture<SharedRoomUiRoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRoomUiRoomCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedRoomUiRoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
