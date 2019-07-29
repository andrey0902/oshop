import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  MatBadgeModule, MatButtonModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ShoppingCartComponent } from '../../shopping-cart/shopping-cart.component';
import { LoginComponent } from '../../membership/login/login.component';
import { SignUpComponent } from '../../membership/sign-up/sign-up.component';
import { MyOrdersComponent } from '../../my-orders/my-orders.component';
import { AdminOrdersComponent } from '../../admin/orders/admin-orders.component';
import { AdminProductsComponent } from '../../admin/products/admin-products.component';
import { ProductQuantityComponent } from '../../product-quantity/product-quantity.component';
import { ServerNonErrorModule } from '../server-error-non/server-error.module';
import { InputModule } from '../input/input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleTableModule } from '../simple-table/simple-table.module';
import { SearchComponent } from '../../admin/search/search.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthService } from '../../auth/auth-service.service';
import { BehaviorSubject, of } from 'rxjs/index';
import { ProfileService } from '../../auth/profile.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const cart = {
    allCountProduct: 1
  };
  const user = {
    email: 'test@gmail.com',
    exist: true,
    isAdmin: true,
    name: 'test'
  };
  const authServiceSpy =
    jasmine.createSpyObj('AuthService', ['logout']);

  const profileSpy =
    jasmine.createSpyObj('ProfileService', ['getObjectUser']);
  profileSpy.getObjectUser.and.returnValue(of((user as User)));


  const ShoppingCartServiceSpy =
    jasmine.createSpyObj('ShoppingCartService', ['getCart']);
  ShoppingCartServiceSpy.getCart.and.returnValue(of(cart));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        ShoppingCartComponent,
        LoginComponent,
        SignUpComponent,
        MyOrdersComponent,
        MyOrdersComponent,
        AdminOrdersComponent,
        AdminProductsComponent,
        ShoppingCartComponent,
        ProductQuantityComponent,
        SearchComponent,
      ],
      imports: [
        MatBadgeModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule.withRoutes(
          [
            {path: 'shopping-cart', component: ShoppingCartComponent},
            {path: 'auth/login', component: LoginComponent},
            {path: 'auth/sign-up', component: SignUpComponent},
            {path: 'my/orders', component: MyOrdersComponent},
            {path: 'admin/orders', component: AdminOrdersComponent},
            {path: 'admin/products', component: AdminProductsComponent},
            ]
        ),
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        MatButtonModule,
        ServerNonErrorModule,
        MatProgressSpinnerModule,
        SimpleTableModule,
        NgxDatatableModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ProfileService, useValue: profileSpy },
        { provide: ShoppingCartService, useValue: ShoppingCartServiceSpy },
        { provide: AngularFirestore, useValue: FirestoreStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should be call logout method fo the service', () => {
    component.logout();
    expect(authServiceSpy.logout.calls.count()).toBe(1);
  });
});
