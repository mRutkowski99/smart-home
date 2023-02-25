import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileShellUiMenuComponent } from './mobile-shell-ui-menu.component';

describe('MobileShellUiMenuComponent', () => {
  let component: MobileShellUiMenuComponent;
  let fixture: ComponentFixture<MobileShellUiMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileShellUiMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileShellUiMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
