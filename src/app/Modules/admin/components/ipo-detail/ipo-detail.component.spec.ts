import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoDetailComponent } from './ipo-detail.component';

describe('IpoDetailComponent', () => {
  let component: IpoDetailComponent;
  let fixture: ComponentFixture<IpoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpoDetailComponent]
    });
    fixture = TestBed.createComponent(IpoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
