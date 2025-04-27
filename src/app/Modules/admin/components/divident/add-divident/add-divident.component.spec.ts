import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDividentComponent } from './add-divident.component';

describe('AddDividentComponent', () => {
  let component: AddDividentComponent;
  let fixture: ComponentFixture<AddDividentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDividentComponent]
    });
    fixture = TestBed.createComponent(AddDividentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
