import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutComponent } from './check-out.component';
import { CheckOutFormComponent } from './check-out-form/check-out-form.component';
import { ShoppingCartSummaryComponent } from '../shared/components/shopping-cart-summary/shopping-cart-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../shared/input/input.module';
import { MatCardModule, MatListModule } from '@angular/material';
import { of } from 'rxjs/index';
import { ProfileService } from '../auth/profile.service';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { mockShoppingCart } from '../shared/test-helper/mockData';
import { OrderService } from '../shared/services/order.service';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;
  const ShoppingCartServiceSpy =
    jasmine.createSpyObj('ShoppingCartService', ['getCart', 'clearCart']);

  ShoppingCartServiceSpy.getCart.and.returnValue(of(mockShoppingCart));

  const profileServiceSpy =
    jasmine.createSpyObj('ProfileService', ['getUser']);
  profileServiceSpy.getUser.and.returnValue(of({uid: 55}));

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const orderServiceSpy =
    jasmine.createSpyObj('OrderService', ['storeOrder']);
  orderServiceSpy.storeOrder.and.returnValue(of(mockShoppingCart));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckOutComponent,
        CheckOutFormComponent,
        ShoppingCartSummaryComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        MatCardModule,
        MatListModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: OrderService, useValue: orderServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be return new Order', () => {
    component.cart = mockShoppingCart;
    component.userUid = '1';
    expect(component.initOrder({test: 'test'}).userUid).toBe('1');
  });

  describe('PlacedOrder', () => {
    beforeEach(() => {
      component.cart = mockShoppingCart;
    });

    it('Should be call method clearCart', () => {
      component.placedOrder(mockShoppingCart);
      expect(orderServiceSpy.storeOrder.calls.count()).toBe(1);
    });
    it('Should be call router redirect', () => {
      routerSpy.navigate.calls.reset();
      component.placedOrder(mockShoppingCart);
      expect(routerSpy.navigate.calls.count()).toBe(1);
    });
  });
});
