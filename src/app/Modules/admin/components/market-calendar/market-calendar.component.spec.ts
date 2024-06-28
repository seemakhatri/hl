import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCalendarComponent } from './market-calendar.component';

describe('MarketCalendarComponent', () => {
  let component: MarketCalendarComponent;
  let fixture: ComponentFixture<MarketCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketCalendarComponent]
    });
    fixture = TestBed.createComponent(MarketCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
