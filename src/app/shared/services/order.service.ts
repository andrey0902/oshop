import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  connect;
  constructor(private db: AngularFireDatabase) {
    this.connect = db.list(`/order-list`);
  }

  storeOrder(order) {
    return fromPromise(this.connect.push(order));
  }

  getOrders() {
    return this.connect.valueChanges()
      .pipe(map((val: any) => {
        console.log('getOrders', val);
        return this.prepareData(val);
      }));
  }

  getOrdersByUser(userUid: string) {
    return this.db.list('/order-list',
      ref => ref.orderByChild('userUid').equalTo(userUid))
      .valueChanges()
      .pipe(map((val: any) => {
        return this.prepareData(val);
      }));
  }

  prepareData(val) {
    return val.map(item => {
      item.items = item.items.map((i) => {
        return new ShoppingCartItem(i);
      });
      return item;
    });
  }
}
