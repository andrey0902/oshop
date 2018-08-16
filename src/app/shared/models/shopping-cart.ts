import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
  items: {[index: string]: ShoppingCartItem};
  key: string;

  constructor(data) {
    this.key = data.key;
    this.items = this.prepareItems(data.items);
  }

  prepareItems(data: any) {
    const temp = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        temp[key] = new ShoppingCartItem(data[key]);
      }
    }
    return temp;
  }

  get productIds(): string[] {
    return Object.keys(this.items);
  }

  getQuantity(product: Product): string | number {
    const item = this.items[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let tempCount = 0;
    this.products.forEach((item) => {
      tempCount += item.totalPrice;
    });
    return tempCount;
  }

  get products(): ShoppingCartItem[] {
    return Object.values(this.items);
  }

  get productsNoKey() {
    return this.deleteKey();
  }

  private deleteKey() {
   return Object.values(this.items).map(i => {
      delete i.product.$key;
      delete i.product.key;
      return i;
    });
  }

  get allCountProduct(): number {
    let tempCount = 0;
    for (const key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        tempCount +=  this.items[key].quantity;
      }
    }
    return tempCount;
  }
}
