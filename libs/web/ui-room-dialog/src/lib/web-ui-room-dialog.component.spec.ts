import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUiRoomDialogComponent } from './web-ui-room-dialog.component';

describe('WebUiRoomDialogComponent', () => {
  let component: WebUiRoomDialogComponent;
  let fixture: ComponentFixture<WebUiRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebUiRoomDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebUiRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
