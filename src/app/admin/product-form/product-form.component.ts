import { Component, OnInit } from '@angular/core';
import { ManageDataService } from '../shared/services/manage-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../shared/models/product';
import { HelperValidators } from '../../shared/helper-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  caterories$;
  form: FormGroup;
  canReset = true;
  isUpdate = false;
  uid = null;
  constructor(private manageDataService: ManageDataService,
              private route: ActivatedRoute,
              private router: Router) {
    this.caterories$ = this.manageDataService.getCategoryProduct();
    this.manageDataService.getCategoryProduct().subscribe(val => {
      console.log(val); }
      );
  }

  ngOnInit() {
    this.initForm();
    this. getProductUid();
  }

  getProductUid() {
    this.route.paramMap
      .pipe(switchMap(param => {
        this.uid = param.get('uid');
        if (this.uid) {
          return this.manageDataService.getProduct(this.uid);
        }
        return of(null);
      }), filter(val => val))
      .pipe(take(1))
      .subscribe(data => {
        this.patchForm(data);
        this.canReset = false;
        this.isUpdate = true;
      });
  }

  patchForm(data) {
    this.form.patchValue({
      title: data.title,
      price: data.price,
      categories: data.categories,
      imageUrl: data.imageUrl,
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        HelperValidators.checkSpace,
        HelperValidators.checkLength,
      ]),
      price: new FormControl(null, [
        Validators.required,
        HelperValidators.isNegative(1)
      ]),
      categories: new FormControl(null, [
        Validators.required,
      ]),
      imageUrl:  new FormControl(null, [
        Validators.required,
        HelperValidators.checkUrl
      ]),
    });
  }

  saveProduct(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      this.isSelectetSave(this.uid, form.value);
    }
  }

  isSelectetSave(isUpdate, product) {
    if (isUpdate) {
      this.manageDataService.updateProduct(this.uid, product)
        .then(res => {
          this.router.navigate(['admin/products']);
        });
      return;
    }
    this.manageDataService.createProduct(product)
      .then(res => {
        this.router.navigate(['admin/products']);
      });
  }

  reset() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

  isValidLink(): boolean {
   return !(this.form.get('imageUrl') as FormControl).hasError('patternUrl');
  }

}
