import { Component, OnInit } from '@angular/core';
import { ManageDataService } from '../shared/services/manage-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;
  constructor(public productService: ManageDataService) { }

  ngOnInit() {
    this.products$ = this.productService.getAllProducts();
  }

  public getProducts() {

  }

}
