import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

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
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ));
  }

  getProduct(uid) {
    return this.db.object(`/products/${uid}`).valueChanges();
  }

  updateProduct(uid, product) {
    return this.db.object(`/products/${uid}`).update(product);
  }

  deleteProduct(uid) {
    return this.db.object(`/products/${uid}`).remove();
  }

  filterByTitle(search: string, products: any[]) {
    return products.filter(p => {
      return p.title.toLowerCase().includes(search.toLowerCase());
    });
  }
}
