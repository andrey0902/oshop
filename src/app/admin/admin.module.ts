import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputLastModule } from '../input-last/input.module';
import { CardModule } from '../shared/card/card.module';
import { ResolveDataService } from './shared/services/resolve-data.service';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { SearchComponent } from './search/search.component';
import { AdminProductsComponent } from './products/admin-products.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputLastModule,
    CardModule,
    RouterModule,
    NgxDatatableModule,
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
     ConfirmComponent,
     SearchComponent
    ],
  exports: [
    SearchComponent,
    ProductFormComponent,
    AdminProductsComponent,
  ],
  entryComponents: [
     ConfirmComponent
  ],
  providers: [
    ResolveDataService,
  ]
})
export class AdminModule { }
