import { ShoppingCartService } from './shopping-cart.service';
import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';

describe('ShoppingCartService', () => {
  const angularFireDatabaseSpy =
    jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShoppingCartService,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseSpy }
      ]
    });
  });

  it('should be created', inject([ShoppingCartService], (service: ShoppingCartService) => {
    expect(service).toBeTruthy();
  }));
});
