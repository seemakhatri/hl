import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsolidationComponent } from './add-consolidation.component';

describe('AddConsolidationComponent', () => {
  let component: AddConsolidationComponent;
  let fixture: ComponentFixture<AddConsolidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConsolidationComponent]
    });
    fixture = TestBed.createComponent(AddConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
