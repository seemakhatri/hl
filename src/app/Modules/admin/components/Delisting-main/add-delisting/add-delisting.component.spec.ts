import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDelistingComponent } from './add-delisting.component';

describe('AddDelistingComponent', () => {
  let component: AddDelistingComponent;
  let fixture: ComponentFixture<AddDelistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDelistingComponent]
    });
    fixture = TestBed.createComponent(AddDelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
