import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSceneFeatureSceneDetailsComponent } from './mobile-scene-feature-scene-details.component';

describe('MobileSceneFeatureSceneDetailsComponent', () => {
  let component: MobileSceneFeatureSceneDetailsComponent;
  let fixture: ComponentFixture<MobileSceneFeatureSceneDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSceneFeatureSceneDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSceneFeatureSceneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
