import { TestBed } from '@angular/core/testing';

import { SemesterGetByStudentEndpointService } from './semester-get-by-student-endpoint.service';

describe('SemesterGetByStudentEndpointService', () => {
  let service: SemesterGetByStudentEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemesterGetByStudentEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
