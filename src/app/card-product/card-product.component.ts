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
  @Input('shoppingCart') shoppingCart;
  @Input('showActions') showActions = true;
  constructor(private cartService: ShoppingCardService) { }

  ngOnInit() {
    console.log(this.shoppingCart);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
