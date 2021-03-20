import { TestBed } from '@angular/core/testing';

import { TransactionReportService } from './transaction-report.service';

describe('TransactionReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionReportService = TestBed.get(TransactionReportService);
    expect(service).toBeTruthy();
  });
});
