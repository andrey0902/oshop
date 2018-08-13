import { TestBed, inject } from '@angular/core/testing';

import { ManageDataService } from '../../../shared/services/manage-data.service';

describe('GetDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageDataService]
    });
  });

  it('should be created', inject([ManageDataService], (service: ManageDataService) => {
    expect(service).toBeTruthy();
  }));
});
