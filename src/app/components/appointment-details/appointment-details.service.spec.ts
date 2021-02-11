import { TestBed } from '@angular/core/testing';

import { AppointmentDetailsService } from './appointment-details.service';

describe('AppointmentDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentDetailsService = TestBed.get(AppointmentDetailsService);
    expect(service).toBeTruthy();
  });
});
