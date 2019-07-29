import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StickyPositionDirective } from './sticky-position.directive';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ListCategoriesComponent } from '../../list-categories/list-categories.component';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material';
import { of } from 'rxjs';
import { getStyle, searchStyle } from '../test-helper/mockData';

describe('TestDirective', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;
  let listElement: DebugElement;
  let directive;
  const routerSpy =
    jasmine.createSpyObj('Router', ['navigate']);
  const categories$ = of([
    {key: 'bread', name: 'Bread'}]);
  beforeEach(async() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ StickyPositionDirective, ListCategoriesComponent],
      schemas:      [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
      imports: [
        MatListModule
      ]
    })
      .createComponent(ListCategoriesComponent);
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    component.categories$ = categories$;
    listElement = fixture.debugElement;
    directive = new StickyPositionDirective(listElement);
    fixture.detectChanges();
  });

  it('should be set offset', () => {
    directive.startPosition = 1;
    directive['setOffsetElement'](10);
    expect(getStyle(listElement.nativeElement, 'transform')).toContain('9');
  });

  it('should add class move', () => {
    directive.startPosition = 3;
    directive['calculateScroll'](20);
    expect(listElement.nativeElement.classList.contains('move')).toBeTruthy();
  });

  it('Should be call method scroll when happen event window scroll', () => {
    window.document.body.style.height = '300px';
    window.document.body.style.width = '1000px';
    window.scrollTo(window.scrollX, window.scrollY + 300);
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(searchStyle('transform')).toBeTruthy();
  });

  it('Should be call method resize when happen event window scroll but nothing happen', () => {
    window.document.body.style.width = '400px';
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(searchStyle('transform')).toContain('0');
  });

  it('Should be call method resize', () => {
    window.document.body.style.width = '1200px';
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(searchStyle('transform')).toContain('0');
  });
});
