import { TestBed } from '@angular/core/testing';

import { Mototaxi } from './mototaxi';

describe('Mototaxi', () => {
  let service: Mototaxi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mototaxi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
