import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUiUserDialogComponent } from './web-ui-user-dialog.component';

describe('WebUiUserDialogComponent', () => {
  let component: WebUiUserDialogComponent;
  let fixture: ComponentFixture<WebUiUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebUiUserDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebUiUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
