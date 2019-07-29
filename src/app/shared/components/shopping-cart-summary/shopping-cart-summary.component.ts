import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent {
  @Input() cart: ShoppingCart;
  constructor() { }

  allPrice(product) {
    return product.product.price * product.quantity;
  }

}
