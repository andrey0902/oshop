import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary.component';
import { MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatListModule } from '@angular/material';
import { ShoppingCart } from '../../models/shopping-cart';

describe('ShoppingCartSummaryComponent', () => {
  let component: ShoppingCartSummaryComponent;
  let fixture: ComponentFixture<ShoppingCartSummaryComponent>;
  const product = {
    category: 'vegetables',
    imageUrl: 'http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg',
    key: '-KrqgOLs07ZkbapP4EGi',
    price: 2.5,
    title: 'Spinach'
  };
  const cart = new ShoppingCart({
    key: '-ttt',
    items: {
      '-KrqgOLs07ZkbapP4EGi': {
        product,
        quantity: 3
      }
    },
    products: [{
      product,
      quantity: 3,
      totalPrice: 7.5
    }
    ]
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartSummaryComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        MatDividerModule,
        MatListModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartSummaryComponent);
    component = fixture.componentInstance;
    component.cart = cart;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const a = {
  'key':'-LJrt6kvxZWt0hb4ZAVx',
  'items': {
  '-KrqgOLs07ZkbapP4EGi': {
    'product': {
      'title': 'Spinach',
      'price': 2.5,
      'category': 'vegetables',
      'imageUrl': 'jpg',
      'key': '-KrqgOLs07ZkbapP4EGi',
      '$key': null
    },
    'quantity': 3
  },
    '-KrrIkDT19XhPgWo0T0A': {
    'product': {
      'title': 'Freshly Baked Bread',
      'price': 3,
      'category': 'bread',
      'imageUrl': 'jpg',
      'key': '-KrrIkDT19XhPgWo0T0A',
      '$key': null
    },
      'quantity': 2
    },'-KrvrXbV3rqnFEru_ojw':{'product':{'title':'Avacado','price':1.75,'category':'fruits','imageUrl':'https://pbs.twimg.com/profile_images/689609039605460992/mva6YmZ-_400x400.jpg','key':'-KrvrXbV3rqnFEru_ojw','$key':null},'quantity':2}}};
