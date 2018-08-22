import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input() cart: ShoppingCart;
  constructor() { }

  ngOnInit() {
    console.log(this.cart);
  }

  allPrice(product) {
    // console.log(product);
    return product.product.price * product.quantity;
  }

}
