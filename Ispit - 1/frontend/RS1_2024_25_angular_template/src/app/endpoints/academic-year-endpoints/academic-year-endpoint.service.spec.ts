import { TestBed } from '@angular/core/testing';

import { AcademicYearEndpointService } from './academic-year-endpoint.service';

describe('AcademicYearEndpointService', () => {
  let service: AcademicYearEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicYearEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
