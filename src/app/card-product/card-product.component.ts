import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';

import { ShoppingCartService } from '../shared/services/shopping-cart.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {
  @Input() product: Product;
  @Input('shoppingCart') shoppingCart;
  @Input('showActions') showActions = true;
  @Input() validImage = true;
  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    console.log(this.shoppingCart);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
