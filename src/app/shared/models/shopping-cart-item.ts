import { Product } from './product';

export class ShoppingCartItem {
  product: Product;
  quantity: number;

  constructor(data) {
    this.product = new Product(data.product);
    this.quantity = data.quantity;
  }

  get totalPrice(): number {
    return this.quantity * +this.product.price;
  }
}
