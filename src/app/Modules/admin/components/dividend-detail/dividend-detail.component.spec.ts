import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendDetailComponent } from './dividend-detail.component';

describe('DividendDetailComponent', () => {
  let component: DividendDetailComponent;
  let fixture: ComponentFixture<DividendDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DividendDetailComponent]
    });
    fixture = TestBed.createComponent(DividendDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
