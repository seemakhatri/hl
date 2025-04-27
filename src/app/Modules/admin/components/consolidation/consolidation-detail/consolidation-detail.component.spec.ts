import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationDetailComponent } from './consolidation-detail.component';

describe('ConsolidationDetailComponent', () => {
  let component: ConsolidationDetailComponent;
  let fixture: ComponentFixture<ConsolidationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolidationDetailComponent]
    });
    fixture = TestBed.createComponent(ConsolidationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
