import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputModule } from '../../shared/input/input.module';
import { of } from 'rxjs';

import { CardProductModule } from '../../card-product/card-product.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AdminOrdersComponent } from './admin-orders.component';
import { SimpleTableModule } from '../../shared/simple-table/simple-table.module';
import { OrderService } from '../../shared/services/order.service';
import { MatButtonModule } from '@angular/material';

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;
  let orderServiceSpy;
  beforeEach(async(() => {
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrders']);
    orderServiceSpy.getOrders.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [
        AdminOrdersComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        MatButtonModule,
        CardProductModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        SimpleTableModule,
      ],
      providers: [
        FormBuilder,
        { provide: OrderService, useValue: orderServiceSpy },
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
