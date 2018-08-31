import { ShoppingCartService } from './shopping-cart.service';
import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { fbChanget, mockProduct, mockSession2, mockShoppingCart, successPromise } from '../test-helper/mockData';
import { of } from 'rxjs';

describe('ShoppingCartService', () => {
  const angularFireDatabaseSpy =
    jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);
  angularFireDatabaseSpy.object.and.returnValue({
    snapshotChanges() {
      return of(fbChanget);
    },
    remove() {
      return successPromise;
    },
    update(data) {
      return true;
    }
  });
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

  it('should be Call object method', inject([ShoppingCartService], (service: ShoppingCartService) => {
    angularFireDatabaseSpy.object.calls.reset();
    service.getItem('t', 't');
    expect(angularFireDatabaseSpy.object.calls.count()).toBe(1);
  }));

  it('should be remove $key in the object ', inject([ShoppingCartService], (service: ShoppingCartService) => {
    angularFireDatabaseSpy.object.calls.reset();
    angularFireDatabaseSpy.list.and.returnValue([]);
    service['getOrCreateCartId']  = () => {
      return of('test');
    };
    service.addToCart(mockProduct);

    expect(angularFireDatabaseSpy.object.calls.count()).toBe(2);
    expect(mockProduct.hasOwnProperty('$key')).toBeFalsy();
  }));

  describe('clearCart', () => {
    beforeEach(() => {
      angularFireDatabaseSpy.object.calls.reset();
    });

    it('should be Call object method delete and return true', inject([ShoppingCartService], (service: ShoppingCartService) => {
      service['getOrCreateCartId'] = () => of('test');
      service.clearCart()
        .subscribe((val: any) => {
          expect(val).toBeTruthy();
        });
      expect(angularFireDatabaseSpy.object.calls.count()).toBe(1);
    }));
  });

  describe('RemoveFromCart', () => {
    beforeEach(() => {
      angularFireDatabaseSpy.list.and.returnValue([]);
      angularFireDatabaseSpy.object.calls.reset();
    });
    it('should be remove $key in the object ', inject([ShoppingCartService], (service: ShoppingCartService) => {
      service['getOrCreateCartId']  = () => {
        return of('test');
      };
      service.removeFromCart(mockProduct);

      expect(angularFireDatabaseSpy.object.calls.count()).toBe(2);
      expect(mockProduct.hasOwnProperty('$key')).toBeFalsy();
    }));
  });

  describe('getCart', () => {
    beforeEach(() => {
      angularFireDatabaseSpy.list.and.returnValue([]);
      angularFireDatabaseSpy.object.calls.reset();
    });
    it('should be call object method and return data', inject([ShoppingCartService], (service: ShoppingCartService) => {
      service['getOrCreateCartId']  = () => {
        return of('test');
      };
      service.getCart()
        .subscribe((res: any) => {
        expect(res.key).toBe(fbChanget.payload.key);
        });

      expect(angularFireDatabaseSpy.object.calls.count()).toBe(1);
    }));
  });

  describe('create', () => {
    beforeEach(() => {
      angularFireDatabaseSpy.list.calls.reset();
      angularFireDatabaseSpy.list.and.returnValue({
        push() {
          return successPromise;
        }
      });
      angularFireDatabaseSpy.object.calls.reset();
    });
    it('should be call list method and return true', inject([ShoppingCartService], (service: ShoppingCartService) => {
      service['create']()
        .subscribe((res: any) => {
          expect(res).toBeTruthy();
        });

      expect(angularFireDatabaseSpy.list.calls.count()).toBe(1);
    }));
  });

  describe('getOrCreateCartId', () => {
    it('when exist saved cardId must return it', inject([ShoppingCartService], (service: ShoppingCartService) => {
      (service.sessionService as any) = new mockSession2('test');
      service['getOrCreateCartId']()
        .subscribe((res: any) => {
        expect(res).toBe(service.sessionService.getCartId());
        });
      expect(angularFireDatabaseSpy.list.calls.count()).toBe(1);
    }));

    it('when not exist saved cardId must create and return it', inject([ShoppingCartService], (service: ShoppingCartService) => {
      (service.sessionService as any) = new mockSession2(false);
      service['create'] = () => of(mockShoppingCart);
      service['getOrCreateCartId']()
        .subscribe((res: any) => {
          expect(res).toBe(mockShoppingCart);
        });
    }));
  });
});
