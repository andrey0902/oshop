import { TestBed, inject } from '@angular/core/testing';

import { ManageDataService } from './manage-data.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { fbChanget, mockProduct } from '../test-helper/mockData';
import { of } from 'rxjs';

describe('GetDataService', () => {
  const listProduct = [mockProduct, mockProduct];
  const angularFireDatabaseSpy =
    jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ManageDataService,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseSpy }
      ],
      imports: [
        AngularFireDatabaseModule
      ]
    });
  });

  it('should be created', inject([ManageDataService], (service: ManageDataService) => {
    expect(service).toBeTruthy();
  }));

  it('getCategoryProduct Should return val', inject([ManageDataService], (service: ManageDataService) => {
    angularFireDatabaseSpy.list.and.returnValue({
      snapshotChanges() {
       return of([fbChanget]);
      }
    });

    service.getCategoryProduct()
      .subscribe((val: any) => {
        expect(val[0].key).toBe(fbChanget.payload.key);
      });
  }));

  it('createProduct Should call update method', inject([ManageDataService], (service: ManageDataService) => {
    angularFireDatabaseSpy.list.calls.reset();
    angularFireDatabaseSpy.list.and.returnValue({
      push(data) {
       return of(data);
      }
    });

    service.createProduct(mockProduct);
    expect(angularFireDatabaseSpy.list.calls.count()).toBe(1);
  }));

  it('getAllProducts Should return val', inject([ManageDataService], (service: ManageDataService) => {
    angularFireDatabaseSpy.list.and.returnValue({
      snapshotChanges() {
        return of([fbChanget]);
      }
    });

    service.getAllProducts()
      .subscribe((val: any) => {
        expect(val[0].key).toBe(fbChanget.payload.key);
      });
  }));
  it('getProduct Should return val', inject([ManageDataService], (service: ManageDataService) => {
    angularFireDatabaseSpy.object.and.returnValue({
      valueChanges() {
        return of(mockProduct);
      }
    });

    service.getProduct('test')
      .subscribe((val: any) => {
        expect(val.title).toBe(mockProduct.title);
      });
  }));
  it('updateProduct Should call method update object', inject([ManageDataService], (service: ManageDataService) => {
    angularFireDatabaseSpy.object.calls.reset();
    angularFireDatabaseSpy.object.and.returnValue({
      update() {
        return of(mockProduct);
      }
    });

    service.updateProduct('test', 'test');
    expect(angularFireDatabaseSpy.object.calls.count()).toBe(1);
  }));
  it('deleteProduct Should call method remove object', inject([ManageDataService], (service: ManageDataService) => {
    angularFireDatabaseSpy.object.calls.reset();
    angularFireDatabaseSpy.object.and.returnValue({
      remove() {
        return of(mockProduct);
      }
    });

    service.deleteProduct('test');
    expect(angularFireDatabaseSpy.object.calls.count()).toBe(1);
  }));

  it('filterByTitle Should filter array', inject([ManageDataService], (service: ManageDataService) => {
   expect(service.filterByTitle('45', listProduct).length).toBe(0);
  }));

  it('filterByCategory Should filter array', inject([ManageDataService], (service: ManageDataService) => {
    expect(service.filterByCategory('45', listProduct).length).toBe(0);
  }));
  it('filterBy Should filter array', inject([ManageDataService], (service: ManageDataService) => {
    expect(service.filterBy('45', listProduct, 'category').length).toBe(0);
  }));
});
