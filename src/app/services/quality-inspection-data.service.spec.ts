import { TestBed } from '@angular/core/testing';

import { QualityInspectionDataService } from './quality-inspection-data.service';

describe('QualityInspectionDataService', () => {
  let service: QualityInspectionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityInspectionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
