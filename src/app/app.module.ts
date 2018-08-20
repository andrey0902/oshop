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
import {AppRoutingModule} from './app-routing.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthModule} from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import 'hammerjs';
import { ManageDataService } from './shared/services/manage-data.service';
import {
  MatBadgeModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatDividerModule, MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { CardProductComponent } from './card-product/card-product.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { StickyPositionDirective } from './shared/directives/sticky-position.directive';
import { ShoppingCardService } from './shared/services/shopping-card.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckOutFormComponent } from './check-out/check-out-form/check-out-form.component';
import {  InputModule } from './shared/input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from './shared/services/order.service';
import { ShoppingCartSummaryComponent } from './shared/components/shopping-cart-summary/shopping-cart-summary.component';
import { HeaderModule } from './shared/header/header.module';
import { SimpleTableModule } from './shared/simple-table/simple-table.module';
import { ConfirmMatModule } from './shared/confirm-mat/confirm-mat.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccesComponent,
    MyOrdersComponent,
    CardProductComponent,
    ListCategoriesComponent,
    StickyPositionDirective,
    ProductQuantityComponent,
    CheckOutFormComponent,
    ShoppingCartSummaryComponent,
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
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule,
    MatDialogModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    HeaderModule,
    MatProgressSpinnerModule,

    SimpleTableModule,
    ConfirmMatModule,
  ],
  providers: [
    NgbActiveModal,
    ManageDataService,
    ShoppingCardService,
    OrderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
