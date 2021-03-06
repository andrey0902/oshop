import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {

  constructor(@Optional() public dialogRef: MatDialogRef<ViewOrderComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data) { }

  getTotalOrder() {
    let total = 0;
    this.data.forEach(item => {
      total += item.totalPrice;
    });
    return total;
  }

}
