import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSplitComponent } from './stock-split.component';

describe('StockSplitComponent', () => {
  let component: StockSplitComponent;
  let fixture: ComponentFixture<StockSplitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockSplitComponent]
    });
    fixture = TestBed.createComponent(StockSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
