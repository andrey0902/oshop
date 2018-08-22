import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriesComponent } from './list-categories.component';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material';
import { StickyPositionDirective } from '../shared/directives/sticky-position.directive';
import { of } from 'rxjs/index';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;
  const routerSpy =
    jasmine.createSpyObj('Router', ['navigate']);
  const categories$ = of([
    {key: 'bread', name: 'Bread'}]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListCategoriesComponent,
        StickyPositionDirective,
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
      imports: [
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    component.categories$ = categories$;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
