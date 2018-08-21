import { TestBed, inject } from '@angular/core/testing';

import { ManageDataService } from './manage-data.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';

describe('GetDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageDataService],
      imports: [
        AngularFireDatabaseModule
      ]
    });
  });

  it('should be created', inject([ManageDataService], (service: ManageDataService) => {
    expect(service).toBeTruthy();
  }));
});
