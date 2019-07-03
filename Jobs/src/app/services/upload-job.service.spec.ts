import { TestBed } from '@angular/core/testing';

import { UploadJobService } from './upload-job.service';

describe('UploadJobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadJobService = TestBed.get(UploadJobService);
    expect(service).toBeTruthy();
  });
});
