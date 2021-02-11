import { TestBed } from '@angular/core/testing';

import { MyaccountService } from './myaccount.service';

describe('MyaccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyaccountService = TestBed.get(MyaccountService);
    expect(service).toBeTruthy();
  });
});
