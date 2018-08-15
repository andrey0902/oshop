import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
import { takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs/index';
import { OrderService } from '../shared/services/order.service';
import { AuthService } from '../auth/auth-service.service';
import { ProfileService } from '../auth/profile.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  cart;
  userUid;
  constructor(private shoppingCartService: ShoppingCardService,
              private orderService: OrderService,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.getCart();
    this. getUser();
  }

  getUser() {
    this.profileService.getUser()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(user => {
        console.log(user);
        this.userUid = user.uid;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }

  getCart() {
    this.shoppingCartService.getCart()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(cart => this.cart = cart);
  }

  placedOrder(e) {
    // console.log(e, this.cart.products);
    console.log(e, this.cart.productsNoKey);
    e['items'] = this.cart.productsNoKey;
    e['userUid'] = this.userUid;
    this.orderService.storeOrder(e)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(v => {
        console.log('res save', v);
      });
  }

}
