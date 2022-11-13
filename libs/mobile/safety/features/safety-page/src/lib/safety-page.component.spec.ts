import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyPageComponent } from './safety-page.component';

describe('SafetyPageComponent', () => {
  let component: SafetyPageComponent;
  let fixture: ComponentFixture<SafetyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SafetyPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SafetyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
