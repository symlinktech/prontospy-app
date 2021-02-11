import { TestBed } from '@angular/core/testing';

import { MediaFooterService } from './media-footer.service';

describe('MediaFooterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaFooterService = TestBed.get(MediaFooterService);
    expect(service).toBeTruthy();
  });
});
