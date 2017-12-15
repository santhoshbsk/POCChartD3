import { TestBed, inject } from '@angular/core/testing';

import { UnifiedService } from './unified.service';

describe('UnifiedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnifiedService]
    });
  });

  it('should be created', inject([UnifiedService], (service: UnifiedService) => {
    expect(service).toBeTruthy();
  }));
});
