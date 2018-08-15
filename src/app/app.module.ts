import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccesComponent } from './order-succes/order-succes.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthModule} from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import 'hammerjs';
import { ManageDataService } from './shared/services/manage-data.service';
import {
  MatBadgeModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule,
  MatListModule
} from '@angular/material';
import { CardProductComponent } from './card-product/card-product.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { StickyPositionDirective } from './shared/directives/sticky-position.directive';
import { ShoppingCardService } from './shared/services/shopping-card.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ConfirmMatComponent } from './shared/confirm-mat/confirm-mat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccesComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    LoginComponent,
    CardProductComponent,
    ListCategoriesComponent,
    StickyPositionDirective,
    ProductQuantityComponent,
    ConfirmMatComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AuthModule,
    AdminModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatBadgeModule,
    MatChipsModule,
    MatDialogModule,
  ],
  providers: [
    NgbActiveModal,
    ManageDataService,
    ShoppingCardService
  ],
  entryComponents: [
    ConfirmMatComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
