import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SessionService } from '../../auth/session.service';
import { Product } from '../models/product';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable, of } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  constructor(private db: AngularFireDatabase) {
  }

  clearCart(): Observable<any> {
    return this.getOrCreateCartId()
      .pipe(switchMap(cartId => {
        return fromPromise(this.db.object(`/shopping-carts/${cartId}`).remove());

      }));
  }

  getItem(cartId: string, productId: string) {
      return  this.db.object(
       `/shopping-carts/${cartId}/items/${productId}`
     );
  }

  addToCart(product: Product) {
    delete product.$key;
    this.callUpdateItem(product, 1);
  }

  removeFromCart(product: Product) {
    // get refer on the product on db
    delete product.$key;
    this.callUpdateItem(product, -1);
  }

  public getCart() {
    return this.getOrCreateCartId()
        .pipe(switchMap(cartId => {
          return this.db.object(`/shopping-carts/${cartId}`).snapshotChanges()
            .pipe(map(c => {
              return  new ShoppingCart({ key: c.payload.key, ...c.payload.val()});
            }));
        }));
  }

  private create() {
    return fromPromise(this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    })) ;
  }

  private getOrCreateCartId(): Observable<string> {
    const cartId = SessionService.getCartId();
    if (cartId) {
      return of(cartId);
    }

    return this.create()
      .pipe(tap((result => SessionService.setCartId(result.key)),
        switchMap((result: any) => {
          return of(result.key);
        })));
  }

  private callUpdateItem(product: Product, change: number) {
    let item$;
    this.getOrCreateCartId()
      .pipe(
        switchMap((cartId) => {
          // get reference the product
          item$ = this.getItem(cartId, product.key);
          return this.getItem(cartId, product.key).snapshotChanges();
      }), take(1))
      .subscribe((item: any) => {

        // check exist product if the truth sum quantity and existing quantity
        const tempProduct: any = {...item.payload.val()};

        const quantity = (tempProduct.quantity || 0) + change;
        this.handler(item$, product, quantity);
      });
  }

  private handler (item$, product, quantity) {
    if (quantity) {
      return this.updateItem(item$, product, quantity);
    }
    this.removeItem(item$);
  }

  private removeItem(item$) {
    item$.remove();
  }

  private updateItem(item$, product, quantity) {
    item$.update({
      product,
      quantity: quantity
    });
  }
}
