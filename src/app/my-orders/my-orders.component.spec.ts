import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersComponent } from './my-orders.component';
import { SimpleTableModule } from '../shared/simple-table/simple-table.module';
import { of } from 'rxjs/index';
import { ProfileService } from '../auth/profile.service';
import { OrderService } from '../shared/services/order.service';

const orders = [
  {
    'datePlaced': 1534398284765,
    'items':
      [
        {'product':
          {
            'title': 'Spinach',
            'price': 2.5,
            'category': 'vegetables',
            'imageUrl': 'jpg',
            '$key': null
          },
          'quantity': 1}
      ],
    'shopping': {
      'address': 'adfsfasdf',
      'address2': 'sdr3rsdf3',
      'city': 'qwqwe',
      'name': 'тестовый сайт'
    },
    'userUid': 'o7PkxFb6iyNeo8Xyg3XAwRwWg5d2'
  }];

describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;
  const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getUser']);
  profileServiceSpy.getUser.and.returnValue(of({uid: 1}));
  const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrdersByUser']);
  orderServiceSpy.getOrdersByUser.and.returnValue(of(orders));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyOrdersComponent
      ],
      imports: [
        SimpleTableModule
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceSpy},
        { provide: OrderService, useValue: orderServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

