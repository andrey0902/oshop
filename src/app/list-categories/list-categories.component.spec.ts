import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriesComponent } from './list-categories.component';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material';
import { StickyPositionDirective } from '../shared/directives/sticky-position.directive';
import { of } from 'rxjs/index';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;
  const isSelected = 1;
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

  it('should set select category', () => {
    component.selected(isSelected);
    expect(component.selectCategory).toBe(1);
  });

  it('should set select category to the null if select matches', () => {
    component.selected(isSelected);
    expect(component.selectCategory).toBe(1);
    component.selected(isSelected);
    expect(component.selectCategory).toBeNull();
  });
  it('should set select category to the null if select not matches', () => {
    component.selected(isSelected);
    expect(component.selectCategory).toBe(1);
    component.selected(55);
    expect(component.selectCategory).toBe(55);
  });
  it('should set select category to the null if select not matches', () => {
    routerSpy.navigate.calls.reset();
    component.selected(isSelected);
    expect(component.selectCategory).toBe(1);
    expect(routerSpy.navigate.calls.count()).toBe(1);
  });
});
