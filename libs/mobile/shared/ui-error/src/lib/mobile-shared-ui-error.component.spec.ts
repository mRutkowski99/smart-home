import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSharedUiErrorComponent } from './mobile-shared-ui-error.component';

describe('MobileSharedUiErrorComponent', () => {
  let component: MobileSharedUiErrorComponent;
  let fixture: ComponentFixture<MobileSharedUiErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSharedUiErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSharedUiErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
