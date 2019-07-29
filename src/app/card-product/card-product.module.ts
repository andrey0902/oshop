import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './card-product.component';
import { MatCardModule } from '@angular/material';
import { ProductQuantityModule } from '../product-quantity/product-quantity.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    ProductQuantityModule,
  ],
  declarations: [
    CardProductComponent
  ],
  exports: [
    CardProductComponent,
    MatCardModule,
    ProductQuantityModule
  ]
})
export class CardProductModule { }
