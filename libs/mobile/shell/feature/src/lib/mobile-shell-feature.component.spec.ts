import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileShellFeatureComponent } from './mobile-shell-feature.component';

describe('MobileShellFeatureComponent', () => {
  let component: MobileShellFeatureComponent;
  let fixture: ComponentFixture<MobileShellFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileShellFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileShellFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
