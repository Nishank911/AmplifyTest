import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityinspectionatcloudComponent } from './qualityinspectionatcloud.component';

describe('QualityinspectionatcloudComponent', () => {
  let component: QualityinspectionatcloudComponent;
  let fixture: ComponentFixture<QualityinspectionatcloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityinspectionatcloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityinspectionatcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
