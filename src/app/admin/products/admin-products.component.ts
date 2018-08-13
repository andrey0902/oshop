import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageDataService } from '../../shared/services/manage-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../shared/models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filterProducts: Product[] = [];
  onDestroy$ = new Subject<boolean>();

  constructor(private manageDataService: ManageDataService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
     this.manageDataService.getAllProducts()
       .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: Product[]) => {
        this.filterProducts = this.products = data;
        console.log('data', data);
      });
  }

  filter(e) {
    this.filterProducts = e
      ? this.manageDataService.filterBy(e, this.products)
      : this.products;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
