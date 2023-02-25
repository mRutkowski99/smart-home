import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileShellUiHeaderComponent } from './mobile-shell-ui-header.component';

describe('MobileShellUiHeaderComponent', () => {
  let component: MobileShellUiHeaderComponent;
  let fixture: ComponentFixture<MobileShellUiHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileShellUiHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileShellUiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
