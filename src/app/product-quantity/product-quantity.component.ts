import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  @Input('shopping-cart') shoppingCart;
  @Input() product: Product;
  constructor(private cartService: ShoppingCardService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
