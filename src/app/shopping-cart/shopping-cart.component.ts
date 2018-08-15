import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCardService } from '../shared/services/shopping-card.service';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/index';
import { ConfirmMatComponent } from '../shared/confirm-mat/confirm-mat.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart$;
  onDestroy$ = new Subject<boolean>();
  constructor(private shoppingCartService: ShoppingCardService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getCart();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  getCart() {
    this.cart$ = this.shoppingCartService.getCart();
  }

  openConfirm(cartId) {
    const dialogRef = this.dialog.open(ConfirmMatComponent, {
      data: {title: 'Clear shopping cart', question: 'Are you sure you want to empty the cart?'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       if (result) {
         this.clearCart(cartId);
       }
    });
  }

  clearCart(cartId) {
    this.shoppingCartService.clearCart(cartId);
  }

}
