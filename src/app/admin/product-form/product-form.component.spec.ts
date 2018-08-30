import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageDataService } from '../../shared/services/manage-data.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule, MatDialog, MatDialogModule } from '@angular/material';
import { InputModule } from '../../shared/input/input.module';
import { of } from 'rxjs';
import { ActivatedRouteStub } from '../../shared/activated-route-stub';
import { CardProductModule } from '../../card-product/card-product.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { mockInvalidProduct, mockProduct } from '../../shared/test-helper/mockData';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProdouctFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  let routerSpy;
  let manageDataServiceSpy;
  let matDialogSpy;

  function  config(param) {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    manageDataServiceSpy = jasmine.createSpyObj('ManageDataService',
      ['getProduct', 'updateProduct', 'createProduct', 'deleteProduct', 'getCategoryProduct']);
    manageDataServiceSpy.deleteProduct.and.returnValue(new Promise((resolve, reject) => { resolve(true); }));
    manageDataServiceSpy.createProduct.and.returnValue(new Promise((resolve, reject) => { resolve(true); }));
    manageDataServiceSpy.updateProduct.and.returnValue(new Promise((resolve, reject) => { resolve(true); }));
    manageDataServiceSpy.getProduct.and.returnValue(of(mockProduct));

    matDialogSpy = jasmine.createSpyObj('MatDialog',
      ['open']);
    matDialogSpy.open.and.returnValue({afterClosed() {
      return of(true);
    }});

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
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: ManageDataService, useValue: manageDataServiceSpy },
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub(null) },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ]
    })
      .compileComponents();
  }
  beforeEach(async(() => {
    config(true);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('Form should be valid after patch valid value', () => {
    component.patchForm(mockProduct);
    expect(component.form.valid).toBeTruthy();
  });

  it('Form should be invalid after patch invalid value', () => {
    component.patchForm(mockInvalidProduct);
    expect(component.form.valid).toBeFalsy();
  });

  it('Form should be invalid after reset', () => {
    component.patchForm(mockProduct);
    expect(component.form.valid).toBeTruthy();
    component.reset();
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();
  });

  it('IsValidLink should be return true after check form value', () => {
    component.patchForm(mockInvalidProduct);
    fixture.detectChanges();
    expect(component.isValidLink()).toBeFalsy();
  });

  it('IsValidLink should be return false after check form value', () => {
    component.patchForm(mockProduct);
    fixture.detectChanges();
    expect(component.isValidLink()).toBeTruthy();
  });

  it('Should call dialog.open method', () => {
    component.openConfirm();
    expect(matDialogSpy.open.calls.count()).toBe(1);
  });


  describe('Delete product method', () => {

    it('Should call delete Product after confirm message', () => {
      component.openConfirm();
      expect(manageDataServiceSpy.deleteProduct.calls.count()).toBe(1);
    });
  });

  describe('Delete product method', () => {

    beforeEach(() => {
      matDialogSpy.open.and.returnValue({afterClosed() {
        return of(false);
      }});
    });
    it('Should to be not call delete Product after closed confirm message', () => {
      component.openConfirm();
      expect(manageDataServiceSpy.deleteProduct.calls.count()).toBe(0);
    });
  });

  describe('Save Product', () => {

    // beforeEach(() => {
    //   component.uid = null;
    // });

    it('Should to be call createProduct', () => {
      component.patchForm(mockProduct);
      fixture.detectChanges();
      expect(component.form.valid).toBeTruthy();
      component.saveProduct(component.form);
      expect(manageDataServiceSpy.createProduct.calls.count()).toBe(1);
    });
  });

  describe('Save Product', () => {

    beforeEach(() => {
      component.uid = 1;
    });

    it('Should to be call updateProduct', () => {
      component.patchForm(mockProduct);
      fixture.detectChanges();
      expect(component.form.valid).toBeTruthy();
      component.saveProduct(component.form);
      expect(manageDataServiceSpy.updateProduct.calls.count()).toBe(1);
    });
  });

  describe('Get Product by Uid', () => {

    it('Should be call method getProduct', () => {
      (component['route'] as any) = new ActivatedRouteStub(1);
      component.getProductUid();
      expect(manageDataServiceSpy.getProduct.calls.count()).toBe(1);
    });
  });

});
