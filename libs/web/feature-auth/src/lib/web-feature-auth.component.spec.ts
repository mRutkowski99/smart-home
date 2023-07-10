import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebFeatureAuthComponent } from './web-feature-auth.component';

describe('WebFeatureAuthComponent', () => {
  let component: WebFeatureAuthComponent;
  let fixture: ComponentFixture<WebFeatureAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebFeatureAuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebFeatureAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
