import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelistingDetailComponent } from './delisting-detail.component';

describe('DelistingDetailComponent', () => {
  let component: DelistingDetailComponent;
  let fixture: ComponentFixture<DelistingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelistingDetailComponent]
    });
    fixture = TestBed.createComponent(DelistingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
