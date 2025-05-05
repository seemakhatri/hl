import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingStockFileComponent } from './pending-stock-file.component';

describe('PendingStockFileComponent', () => {
  let component: PendingStockFileComponent;
  let fixture: ComponentFixture<PendingStockFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingStockFileComponent]
    });
    fixture = TestBed.createComponent(PendingStockFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
