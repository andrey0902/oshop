import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckOutComponent } from '../check-out/check-out.component';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import {
  MatButtonModule, MatCardModule, MatDialog, MatDividerModule, MatIconModule, MatListModule, MatProgressSpinnerModule
} from '@angular/material';
import { of } from 'rxjs/index';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';
import { CheckOutFormComponent } from '../check-out/check-out-form/check-out-form.component';
import { ShoppingCartSummaryComponent } from '../shared/components/shopping-cart-summary/shopping-cart-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../shared/input/input.module';
import { ServerNonErrorModule } from '../shared/server-error-non/server-error.module';

const cart = new ShoppingCart({
    key: '-ttt', items: {
      '-KrqgOLs07ZkbapP4EGi': {
        product: {
          category: 'vegetables',
          imageUrl: 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
          key: '-KrqgOLs07ZkbapP4EGi',
          price: 2.5,
          title: 'Spinach'
        }, quantity: 3
      }
    }
  });

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async(() => {
    const shoppingCartServiceSpy =
      jasmine.createSpyObj('ShoppingCartService', ['getCart']);
    shoppingCartServiceSpy.getCart.and.returnValue(of(cart));
    const matDialogSpy =
      jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      declarations: [
        ShoppingCartComponent,
        CheckOutComponent,
        ProductQuantityComponent,
        CheckOutFormComponent,
        ShoppingCartSummaryComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(
          [
            {path: 'check-out', component: CheckOutComponent}
            ]
        ),
        InputModule,
        MatButtonModule,
        MatIconModule,
        ServerNonErrorModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatListModule,
        MatDividerModule,
      ],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCartServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
