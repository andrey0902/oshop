import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  constructor(private db: AngularFireDatabase) { }

  getCategoryProduct(): Observable<any> {
    return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
  }

  createProduct(product: Product) {
     return this.db.list('/products')
       .push(product);
  }

  getAllProducts() {
    return this.db.list('/products')
      .snapshotChanges();
  }

  getProduct(uid) {
    return this.db.object(`/products/${uid}`).valueChanges();
  }

  updateProduct(uid, product) {
    return this.db.object(`/products/${uid}`).update(product);
  }
}
