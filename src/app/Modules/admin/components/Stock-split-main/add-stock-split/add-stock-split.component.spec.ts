import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockSplitComponent } from './add-stock-split.component';

describe('AddStockSplitComponent', () => {
  let component: AddStockSplitComponent;
  let fixture: ComponentFixture<AddStockSplitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStockSplitComponent]
    });
    fixture = TestBed.createComponent(AddStockSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
