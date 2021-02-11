import { TestBed } from '@angular/core/testing';

import { HttpcancelService } from './httpcancel.service';

describe('HttpcancelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpcancelService = TestBed.get(HttpcancelService);
    expect(service).toBeTruthy();
  });
});
