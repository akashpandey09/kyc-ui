import { TestBed } from '@angular/core/testing';

import { OrderInfoService } from './order-info.service';

describe('OrderInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderInfoService = TestBed.get(OrderInfoService);
    expect(service).toBeTruthy();
  });
});
