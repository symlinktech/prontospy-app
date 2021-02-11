import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOfferedInfoComponent } from './service-offered-info.component';

describe('ServiceOfferedInfoComponent', () => {
  let component: ServiceOfferedInfoComponent;
  let fixture: ComponentFixture<ServiceOfferedInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceOfferedInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOfferedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
