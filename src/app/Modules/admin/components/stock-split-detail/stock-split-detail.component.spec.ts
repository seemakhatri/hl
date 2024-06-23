import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSplitDetailComponent } from './stock-split-detail.component';

describe('StockSplitDetailComponent', () => {
  let component: StockSplitDetailComponent;
  let fixture: ComponentFixture<StockSplitDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockSplitDetailComponent]
    });
    fixture = TestBed.createComponent(StockSplitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
