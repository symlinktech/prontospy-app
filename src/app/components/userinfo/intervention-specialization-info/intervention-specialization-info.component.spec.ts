import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionSpecializationInfoComponent } from './intervention-specialization-info.component';

describe('InterventionSpecializationInfoComponent', () => {
  let component: InterventionSpecializationInfoComponent;
  let fixture: ComponentFixture<InterventionSpecializationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionSpecializationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionSpecializationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
