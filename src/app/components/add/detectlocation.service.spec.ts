import { TestBed, inject } from '@angular/core/testing';

import { DetectlocationService } from './detectlocation.service';

describe('DetectlocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetectlocationService]
    });
  });

  it('should be created', inject([DetectlocationService], (service: DetectlocationService) => {
    expect(service).toBeTruthy();
  }));
});
