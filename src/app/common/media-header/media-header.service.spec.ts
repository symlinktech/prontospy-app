import { TestBed } from '@angular/core/testing';

import { MediaHeaderService } from './media-header.service';

describe('MediaHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaHeaderService = TestBed.get(MediaHeaderService);
    expect(service).toBeTruthy();
  });
});
