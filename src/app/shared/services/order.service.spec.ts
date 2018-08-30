import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { formData, successPromise } from '../test-helper/mockData';
import { of } from 'rxjs';

fdescribe('OrderService', () => {
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

  fit('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));

  fit('storeOrder should be return order', inject([OrderService], (service: OrderService) => {
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

  fit('getOrders should be return order', inject([OrderService], (service: OrderService) => {
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

  fit('getOrdersByUser should be return order', inject([OrderService], (service: OrderService) => {
    service.connect = {
      valueChanges() {
        return of([{items: []}, {items: []}]);
      }
    };
    service.getOrdersByUser('test')
      .subscribe((val) => {
        console.log(val);
        expect(val).toBeTruthy();
      });
  }));
});
