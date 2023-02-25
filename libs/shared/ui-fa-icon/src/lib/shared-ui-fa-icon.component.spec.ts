import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUiFaIconComponent } from './shared-ui-fa-icon.component';

describe('SharedUiFaIconComponent', () => {
  let component: SharedUiFaIconComponent;
  let fixture: ComponentFixture<SharedUiFaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiFaIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiFaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
