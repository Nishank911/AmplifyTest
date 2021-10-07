import { TestBed } from '@angular/core/testing';

import { QualityInspectionDefectsCommentsService } from './quality-inspection-defects-comments.service';

describe('QualityInspectionDefectsCommentsService', () => {
  let service: QualityInspectionDefectsCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityInspectionDefectsCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
