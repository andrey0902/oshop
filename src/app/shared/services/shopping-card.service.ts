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

  getItem(cartId: string, productId: string) {
      return  this.db.object(
       `/shopping-carts/${cartId}/items/${productId}`
     );
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    // get refer on the product on db
    this.updateItemQuantity(product, -1);
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

  private updateItemQuantity(product: Product, change: number) {
    let item$;
    this.getOrCreateCartId()
      .pipe(
        switchMap((cartId) => {
          // get reference the product
          item$ = this.getItem(cartId, product.key);
          return item$.snapshotChanges();
      }),
        take(1)
      )
      .subscribe((item: any) => {

        // check exist product if the truth sum quantity and existing quantity
        const tempProduct: any = {...item.payload.val()};

        // update product
        item$.update({
          product: product,
          quantity: (tempProduct.quantity || 0) + change
        });
      });
  }
}
