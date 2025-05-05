import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRejectionDialogComponent } from './fund-rejection-dialog.component';

describe('FundRejectionDialogComponent', () => {
  let component: FundRejectionDialogComponent;
  let fixture: ComponentFixture<FundRejectionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundRejectionDialogComponent]
    });
    fixture = TestBed.createComponent(FundRejectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
