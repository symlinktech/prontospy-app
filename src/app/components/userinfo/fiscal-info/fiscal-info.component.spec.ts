import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalInfoComponent } from './fiscal-info.component';

describe('FiscalInfoComponent', () => {
  let component: FiscalInfoComponent;
  let fixture: ComponentFixture<FiscalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiscalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
