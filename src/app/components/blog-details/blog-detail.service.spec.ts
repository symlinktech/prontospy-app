import { TestBed } from '@angular/core/testing';

import { BlogDetailService } from './blog-detail.service';

describe('BlogDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogDetailService = TestBed.get(BlogDetailService);
    expect(service).toBeTruthy();
  });
});
