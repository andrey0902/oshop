import { Product } from './product';

export class ShoppingCartItem {
  product: Product;
  quantity: number;

  constructor(data) {
    this.product = data.product;
    this.quantity = data.quantity;
  }
}
