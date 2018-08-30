import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ViewOrderComponent } from '../view-order/view-order.component';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent implements OnInit {
  @Input() rows;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openModal(items) {
    this.dialog.open(ViewOrderComponent, {
      data: items,
    });
  }
}
