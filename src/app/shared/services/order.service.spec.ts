import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';
import { AngularFireDatabase } from 'angularfire2/database';

describe('OrderService', () => {
  const angularFireDatabaseSpy =
    jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseSpy }
      ]
    });
  });

  it('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
