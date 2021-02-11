import { TestBed } from '@angular/core/testing';

import { ReviewAddService } from './review-add.service';

describe('ReviewAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewAddService = TestBed.get(ReviewAddService);
    expect(service).toBeTruthy();
  });
});
