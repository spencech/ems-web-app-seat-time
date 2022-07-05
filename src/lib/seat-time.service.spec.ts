import { TestBed } from '@angular/core/testing';

import { SeatTimeService } from './seat-time.service';

describe('SeatTimeService', () => {
  let service: SeatTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
