import { TestBed, inject } from '@angular/core/testing';

import { ManageDataService } from './manage-data.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

describe('GetDataService', () => {
  const angularFireDatabaseSpy =
    jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ManageDataService,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseSpy }
      ],
      imports: [
        AngularFireDatabaseModule
      ]
    });
  });

  it('should be created', inject([ManageDataService], (service: ManageDataService) => {
    expect(service).toBeTruthy();
  }));
});
