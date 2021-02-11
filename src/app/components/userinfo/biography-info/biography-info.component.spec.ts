import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyInfoComponent } from './biography-info.component';

describe('BiographyInfoComponent', () => {
  let component: BiographyInfoComponent;
  let fixture: ComponentFixture<BiographyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiographyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiographyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
