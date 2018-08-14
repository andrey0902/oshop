import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageDataService } from '../shared/services/manage-data.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {  switchMap, tap } from 'rxjs/operators';
import { ShoppingCardService } from '../shared/services/shopping-card.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  filterProducts: any[] = [];
  products: any[] = [];
  categories$;
  selectCategory: string | null = null;
  cart;
  private onDestroy$ = new Subject<boolean>();
  constructor(public productService: ManageDataService,
              private route: ActivatedRoute,
              public shoppingService: ShoppingCardService) { }

  ngOnInit() {
    this.getCategories();
    this.defineProducts();
    this.getCart();
  }

  getCart() {
    this.shoppingService.getCart()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  defineProducts() {
    this.productService.getAllProducts()
      .pipe(tap((products) => {
          this.filterProducts = this.products = products;
        }),
        switchMap((products) => {
          return this.route.queryParamMap;
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe(params => {
         this.selectCategory = params.get('category');
          this.setFilter(this.selectCategory);
      });
  }

  getCategories() {
    this.categories$ = this.productService.getCategoryProduct();
  }

  setFilter(url) {
    this.filterProducts = url ? this.productService.filterByCategory(url, this.products) : this.products;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
