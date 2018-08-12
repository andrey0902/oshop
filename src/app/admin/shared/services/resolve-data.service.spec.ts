import { TestBed, inject } from '@angular/core/testing';

import { ResolveDataService } from './resolve-data.service';

describe('ResolveDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveDataService]
    });
  });

  it('should be created', inject([ResolveDataService], (service: ResolveDataService) => {
    expect(service).toBeTruthy();
  }));
});
