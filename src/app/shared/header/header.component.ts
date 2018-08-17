import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../auth/auth-service.service';
import { ProfileService } from '../../auth/profile.service';
import { ShoppingCardService } from '../services/shopping-card.service';
import { User } from '../models/user';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
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
