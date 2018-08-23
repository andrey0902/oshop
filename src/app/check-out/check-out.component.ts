import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderService } from '../shared/services/order.service';
import { ProfileService } from '../auth/profile.service';
import { Order } from '../shared/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  cart;
  userUid;
  constructor(private shoppingCartService: ShoppingCartService,
              private orderService: OrderService,
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    this.getCart();
    this.getUser();
  }

  getUser() {
    this.profileService.getUser()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(user => {
        console.log('USER', user);
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

  placedOrder(shopping) {
    const order = this.initOrder(shopping);

    this.orderService.storeOrder(order)
      .pipe(takeUntil(this.onDestroy$),
        switchMap((result: any) => {
          this.router.navigate(['/order-success/', result.key]);
          return this.shoppingCartService.clearCart();
        }))
      .subscribe();
  }

  initOrder(shopping) {
    return new Order({
      shopping,
      items: this.cart.productsNoKey,
      userUid: this.userUid
    });
  }

}
