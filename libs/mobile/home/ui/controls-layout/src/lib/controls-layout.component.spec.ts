import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsLayoutComponent } from './controls-layout.component';

describe('ControlsLayoutComponent', () => {
  let component: ControlsLayoutComponent;
  let fixture: ComponentFixture<ControlsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlsLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
