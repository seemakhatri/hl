import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingFundFileComponent } from './pending-fund-file.component';

describe('PendingFundFileComponent', () => {
  let component: PendingFundFileComponent;
  let fixture: ComponentFixture<PendingFundFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingFundFileComponent]
    });
    fixture = TestBed.createComponent(PendingFundFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
