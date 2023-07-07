import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebFeatureHomeDetailsComponent } from './web-feature-home-details.component';

describe('WebFeatureHomeDetailsComponent', () => {
  let component: WebFeatureHomeDetailsComponent;
  let fixture: ComponentFixture<WebFeatureHomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebFeatureHomeDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebFeatureHomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
