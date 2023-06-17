import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSceneFeatureAddSceneComponent } from './mobile-scene-feature-add-scene.component';

describe('MobileSceneFeatureAddSceneComponent', () => {
  let component: MobileSceneFeatureAddSceneComponent;
  let fixture: ComponentFixture<MobileSceneFeatureAddSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSceneFeatureAddSceneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSceneFeatureAddSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
