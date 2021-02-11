import { TestBed } from '@angular/core/testing';

import { DailyTimeService } from './daily-time.service';

describe('DailyTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyTimeService = TestBed.get(DailyTimeService);
    expect(service).toBeTruthy();
  });
});
