import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { SessionService } from '../../auth/session.service';
import { Product } from '../models/product';
import { map, take } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  constructor(private db: AngularFireDatabase) {
  }

 private create() {
   return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    });
  }

  public async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}`).snapshotChanges()
      .pipe(map(c => {
        return { key: c.payload.key, ...c.payload.val()};
      }));
  }

 private async getOrCreateCartId(): Promise<string> {
   const cartId = SessionService.getCartId();
   if (cartId) {
     return cartId;
   }

   const result = await this.create();
   SessionService.setCartId(result.key);
   return result.key;
 }

  getItem(cartId: string, productId: string) {
      return  this.db.object(
       `/shopping-carts/${cartId}/items/${productId}`
     );
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    // get refer on the product on db
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();

    // get refer on the product on db
    const item$: any = this.getItem(cartId, product.key);

    // check if exists product in db or not
    // then create product or update product
    item$.snapshotChanges().pipe(take(1))
      .subscribe(item => {

        // check exist product if the truth sum quantity and existing quantity
        const tempProduct = {...item.payload.val()};

        // update product
        item$.update({
          product: product,
          quantity: (tempProduct.quantity || 0) + change
        });
      });
  }
}
