import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';

import { ShoppingCardService } from '../shared/services/shopping-card.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {
  @Input() product: Product;
  @Input('shopping-cart') shoppingCart;
  @Input('show-actions') showActions = true;
  constructor(private cartService: ShoppingCardService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity(): string | number {
    if (!this.shoppingCart) {
      return 0;
    }
    return this.shoppingCart.items[this.product.key] ? this.shoppingCart.items[this.product.key].quantity : 0;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
