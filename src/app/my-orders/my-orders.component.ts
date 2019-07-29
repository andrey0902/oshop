import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../auth/profile.service';
import { OrderService } from '../shared/services/order.service';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  rows;
  onDestroy$ = new Subject();
  constructor(private profileService: ProfileService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {
    this.profileService.getUser()
      .pipe(switchMap((val: any) => {
        if (val) {
          return this.orderService.getOrdersByUser(val.uid);
        }
        return of(null);
      }), takeUntil(this.onDestroy$))
      .subscribe((val: any) => {
     
        this.rows = val;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
