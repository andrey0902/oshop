import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperValidators } from '../../shared/helper-validators';

@Component({
  selector: 'app-check-out-form',
  templateUrl: './check-out-form.component.html',
  styleUrls: ['./check-out-form.component.scss']
})
export class CheckOutFormComponent implements OnInit {
  checkoutForm: FormGroup;
  @Output() saveOrder = new EventEmitter();
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.checkoutForm = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        HelperValidators.checkSpace]],
      address: [null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        HelperValidators.checkSpace]],
      address2: [null, [
        Validators.maxLength(20),
        Validators.minLength(3),
        HelperValidators.checkSpace]],
      city: [null, [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        HelperValidators.checkSpace]],
    });
  }

  placeOrder() {
    if (this.checkoutForm.value) {
      this.saveOrder.emit(this.checkoutForm.value);
      }
    }

}
