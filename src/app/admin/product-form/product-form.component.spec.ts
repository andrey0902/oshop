import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageDataService } from '../../shared/services/manage-data.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule, MatDialog, MatDialogModule } from '@angular/material';
import { InputModule } from '../../shared/input/input.module';
import { of } from 'rxjs';
import { ActivatedRouteStub } from '../../shared/activated-route-stub';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationStrategy } from '@angular/common';
import { CardProductModule } from '../../card-product/card-product.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';

describe('ProdouctFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async(() => {
    const spyActivateRouter = jasmine.createSpyObj('Router', ['paramMap', 'paramMap.pipe']);
    const spyRouter = jasmine.createSpyObj('ActivatedRoute', ['navigate']);
    const spyManageDataService = jasmine.createSpyObj('ManageDataService',
      ['getProduct', 'updateProduct', 'createProduct', 'deleteProduct', 'getCategoryProduct']);
    TestBed.configureTestingModule({
      declarations: [ ProductFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        InputModule,
        MatButtonModule,
        CardProductModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
      providers: [
        FormBuilder,
        { provide: ManageDataService, useValue: spyManageDataService },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useValue: spyRouter },
        MatDialog,
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
