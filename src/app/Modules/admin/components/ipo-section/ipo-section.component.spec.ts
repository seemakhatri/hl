import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoSectionComponent } from './ipo-section.component';

describe('IpoSectionComponent', () => {
  let component: IpoSectionComponent;
  let fixture: ComponentFixture<IpoSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpoSectionComponent]
    });
    fixture = TestBed.createComponent(IpoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
