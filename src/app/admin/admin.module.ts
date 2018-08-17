import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../shared/input/input.module';
import { CardModule } from '../shared/components/card/card.module';
import { ResolveDataService } from './shared/services/resolve-data.service';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';
import { SearchComponent } from './search/search.component';
import { AdminProductsComponent } from './products/admin-products.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminOrdersComponent } from './orders/admin-orders.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { SimpleTableComponent } from '../shared/components/simple-table/simple-table.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputModule,
    CardModule,
    RouterModule,
    NgxDatatableModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
     ConfirmComponent,
     SearchComponent,
    AdminOrdersComponent,
    SimpleTableComponent,
    ],
  exports: [
    SearchComponent,
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    SimpleTableComponent,
  ],
  entryComponents: [
     ConfirmComponent
  ],
  providers: [
    ResolveDataService,
  ]
})
export class AdminModule { }
