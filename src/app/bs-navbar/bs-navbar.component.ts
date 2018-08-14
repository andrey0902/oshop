import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth-service.service';
import {ProfileService} from '../auth/profile.service';
import {Subject} from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as firebase from 'firebase';
import { User } from '../shared/models/user';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  user: User;
  countProduct: number;
  constructor(private authService: AuthService,
              private profile: ProfileService,
              private shoppingCartService: ShoppingCardService) { }

  ngOnInit() {
    this.getUser();
    this.getCart();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }

  getUser() {
    this.profile.getObjectUser()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(value => {
        this.user = value;
      });
  }

  logout() {
    this.authService.logout();
  }

  getCart() {
    this.shoppingCartService.getCart()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((cart: any) => {
        this.countProduct = cart.allCountProduct;
      });
  }

}
