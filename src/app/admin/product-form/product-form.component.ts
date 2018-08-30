import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManageDataService } from '../../shared/services/manage-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperValidators } from '../../shared/helper-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmMatComponent } from '../../shared/confirm-mat/confirm-mat/confirm-mat.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$;
  onDestroy$ = new Subject();
  form: FormGroup;
  canReset = true;
  isUpdate = false;
  uid = null;
  constructor(private manageDataService: ManageDataService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {
    this.categories$  = this.manageDataService.getCategoryProduct();
  }

  ngOnInit() {
    this.initForm();
    this. getProductUid();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
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
      category: data.category,
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
      category: new FormControl(null, [
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
      this.isSelectedSave(this.uid, form.value);
    }
  }

  isSelectedSave(isUpdate, product) {
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

  openConfirm() {
    const dialogRef = this.dialog.open(ConfirmMatComponent, {
      data: {
        title: 'Confirmation Modal',
        question: 'Are you sure you want to delete a product?'
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(result => {
      if (result) {
        this.deleteProduct();
        }
    });
  }

  deleteProduct() {
    this.manageDataService.deleteProduct(this.uid).then(val => {
      this.router.navigate(['/admin/products']);
    });
  }

}
