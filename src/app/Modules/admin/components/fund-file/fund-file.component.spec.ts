import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundFileComponent } from './fund-file.component';

describe('FundFileComponent', () => {
  let component: FundFileComponent;
  let fixture: ComponentFixture<FundFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundFileComponent]
    });
    fixture = TestBed.createComponent(FundFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
