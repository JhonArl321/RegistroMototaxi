import { TestBed } from '@angular/core/testing';

import { MototaxiService } from './mototaxi';

describe('Mototaxi', () => {
  let service: MototaxiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MototaxiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
