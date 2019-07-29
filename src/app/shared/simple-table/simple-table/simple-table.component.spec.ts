import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTableComponent } from './simple-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogModule } from '@angular/material';
import { ViewOrderComponent } from '../view-order/view-order.component';

describe('SimpleTableComponent', () => {
  let component: SimpleTableComponent;
  let fixture: ComponentFixture<SimpleTableComponent>;
  let matDialogSpy;
  beforeEach(async(() => {
    matDialogSpy = jasmine.createSpyObj('MatDialog',
      ['open']);
    TestBed.configureTestingModule({
      declarations: [
        SimpleTableComponent,
        ViewOrderComponent,
      ],
      imports: [
        NgxDatatableModule,
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call dialog.open method', () => {
    component.openModal({});
    expect(matDialogSpy.open.calls.count()).toBe(1);
  });
});
