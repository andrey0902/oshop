import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  connect;
  constructor(private db: AngularFireDatabase) {
    this.connect = db.list(`/order-list`);
  }

  storeOrder(order) {
    console.log(order);
    return fromPromise(this.connect.push(order));
  }
}
