import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import {ProductsComponent} from './products/products.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {OrderSuccesComponent} from './order-succes/order-succes.component';
import {AdminProductsComponent} from './admin/products/admin-products.component';
import {AdminOrdersComponent} from './admin/orders/admin-orders.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminAuthGuard } from './auth/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'auth',
        loadChildren: './membership/membership.module#MembershipModule'
      },
      {
        path: 'membership',
        loadChildren: './membership/membership.module#MembershipModule',
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [
          AuthGuard
        ]
      },
      {
        path: 'order-success/:id',
        component: OrderSuccesComponent,
        canActivate: [
          AuthGuard
        ]
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [
          AuthGuard
        ]
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      },
    ])
  ],
  declarations: [],
  exports: [
   RouterModule
  ]
})
export class AppRoutingModule { }
