import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductQuantityComponent } from './product-quantity.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  declarations: [
    ProductQuantityComponent
  ],
  exports: [
    ProductQuantityComponent,
    MatButtonModule,
  ]
})
export class ProductQuantityModule { }
