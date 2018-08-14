import { ShoppingCartItem } from './shopping-cart-item';

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
        temp[key] = data[key];
      }
    }
    return temp;
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
