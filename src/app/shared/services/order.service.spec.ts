import { inject, TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { formData, mockOrder, successPromise } from '../test-helper/mockData';
import { of } from 'rxjs';

describe('OrderService', () => {
  const angularFireDatabaseSpy = jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService, {provide: AngularFireDatabase, useValue: angularFireDatabaseSpy}]
    });
  });

  it('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));

  it('storeOrder should be return order', inject([OrderService], (service: OrderService) => {
    service.connect = {
      push() {
        return successPromise;
      }
    };
    service.storeOrder(formData)
      .subscribe((val) => {
        expect(val).toBeTruthy();
      });
  }));

  it('getOrders should be return order', inject([OrderService], (service: OrderService) => {
    service.connect = {
      valueChanges() {
        return of([{items: []}, {items: []}]);
      }
    };
    service.getOrders()
      .subscribe((val) => {
        expect(val).toBeTruthy();
      });
  }));

  it('getOrdersByUser should be return order', inject([OrderService], (service: OrderService) => {
    angularFireDatabaseSpy.list.and.returnValue({
      valueChanges() {
        return of([mockOrder]);
      }
    });
    service.getOrdersByUser('test')
      .subscribe((val) => {
        expect(val).toBeTruthy();
      });
  }));
});
