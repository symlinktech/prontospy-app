import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTimeComponent } from './daily-time.component';

describe('DailyTimeComponent', () => {
  let component: DailyTimeComponent;
  let fixture: ComponentFixture<DailyTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
