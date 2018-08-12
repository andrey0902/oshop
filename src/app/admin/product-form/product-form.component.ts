import { Component, OnInit } from '@angular/core';
import { ManageDataService } from '../shared/services/manage-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../shared/models/product';
import { HelperValidators } from '../../shared/helper-validators';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
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
  constructor(private manageDataService: ManageDataService,
              private route: ActivatedRoute) {
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
        const uid = param.get('uid');
        if (uid) {
          return this.manageDataService.getProduct(uid);
        }
        return of(null);
      }), filter(val => val))
      .subscribe(data => {
        this.patchForm(data);
        this.canReset = false;
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
      this.manageDataService.createProduct((form.value as Product));
    }
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
