import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageDataService } from '../shared/services/manage-data.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products$;
  onDestroy$ = new Subject<boolean>();
  constructor(private manageDataServise: ManageDataService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
     this.manageDataServise.getAllProducts()
       .pipe(
         takeUntil(this.onDestroy$),
         map(changes =>
         changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
       ))
      .subscribe(data => {
        this.products$ = data;
        console.log('data', data);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

}
