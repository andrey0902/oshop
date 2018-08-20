import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { AdminAuthGuard } from '../auth/admin-auth-guard.service';
import { AdminProductsComponent } from './products/admin-products.component';
import { AdminOrdersComponent } from './orders/admin-orders.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'products',
        component: AdminProductsComponent,
        canActivate: [
          AuthGuard,
          AdminAuthGuard
        ]
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
        canActivate: [
          AuthGuard,
          AdminAuthGuard
        ]
      },
      {
        path: 'product/new',
        component: ProductFormComponent,
        canActivate: [
          AuthGuard,
          AdminAuthGuard
        ]
      },
      {
        path: 'product/:uid',
        component: ProductFormComponent,
        canActivate: [
          AuthGuard,
          AdminAuthGuard
        ]
      },
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AdminRoutingModule { }
