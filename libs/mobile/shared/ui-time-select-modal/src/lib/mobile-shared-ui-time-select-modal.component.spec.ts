import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedUiTimeSelectModalComponent } from './mobile-shared-ui-time-select-modal.component';

describe('MobileSharedUiTimeSelectModalComponent', () => {
  let component: MobileSharedUiTimeSelectModalComponent;
  let fixture: ComponentFixture<MobileSharedUiTimeSelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedUiTimeSelectModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSharedUiTimeSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
