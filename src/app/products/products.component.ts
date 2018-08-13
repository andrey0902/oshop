import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageDataService } from '../shared/services/manage-data.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  filterProduct: any[];
  product: any[];
  categories$;
  category: string | null = null;
  private onDestroy$ = new Subject<boolean>();
  constructor(public productService: ManageDataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getUrl();
  }

  public getProducts() {
    this.productService.getAllProducts()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((product) => {
        this.filterProduct = this.product = product;
      });
  }

  getCategories() {
    this.categories$ = this.productService.getCategoryProduct();
  }

  getUrl() {
    this.route.queryParamMap.pipe(takeUntil(this.onDestroy$))
      .subscribe(val => {
        this.category = val.get('category');
        if (this.product) {
          this.setFilter(this.category);
        }
      });
  }

  setFilter(url) {
    this.filterProduct = url ? this.productService.filterBy(url, this.product, 'category') : this.product;
    console.log('this.filterProduct', this.filterProduct);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
