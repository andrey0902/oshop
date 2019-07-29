import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  rows;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
  this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders()
      .subscribe(val => {
        this.rows = val;
      });
  }
}
