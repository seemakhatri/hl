import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelistingComponent } from './delisting.component';

describe('DelistingComponent', () => {
  let component: DelistingComponent;
  let fixture: ComponentFixture<DelistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelistingComponent]
    });
    fixture = TestBed.createComponent(DelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
