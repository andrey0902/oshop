import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutComponent } from './check-out.component';
import { CheckOutFormComponent } from './check-out-form/check-out-form.component';
import { ShoppingCartSummaryComponent } from '../shared/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../shared/input/input.module';
import { MatCardModule, MatListModule } from '@angular/material';
import { of } from 'rxjs/index';
import { ProfileService } from '../auth/profile.service';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;
  const shoppingCardServiceSpy =
    jasmine.createSpyObj('ShoppingCardService', ['getCart', 'clearCart']);

  shoppingCardServiceSpy.getCart.and.returnValue(new ShoppingCart({
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
  }));

  const profileServiceSpy =
    jasmine.createSpyObj('ProfileService', ['getUser']);
  profileServiceSpy.getUser.and.returnValue(of({uid: 55}));

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
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
        {provide: ProfileService, useValue: profileServiceSpy},
        {provide: Router, useValue: routerSpy}
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
});
