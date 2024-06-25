import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockFileComponent } from './stock-file.component';

describe('StockFileComponent', () => {
  let component: StockFileComponent;
  let fixture: ComponentFixture<StockFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockFileComponent]
    });
    fixture = TestBed.createComponent(StockFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
