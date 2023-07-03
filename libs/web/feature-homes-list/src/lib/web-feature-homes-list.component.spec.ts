import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebFeatureHomesListComponent } from './web-feature-homes-list.component';

describe('WebFeatureHomesListComponent', () => {
  let component: WebFeatureHomesListComponent;
  let fixture: ComponentFixture<WebFeatureHomesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebFeatureHomesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebFeatureHomesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
