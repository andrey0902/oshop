import { AfterViewInit, Component, ContentChild, ElementRef, HostBinding, OnInit } from '@angular/core';
import { InputFormFieldControl } from '../shared/input-form-fieldControl';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, AfterViewInit {
  @ContentChild(InputFormFieldControl) public controlValidation: InputFormFieldControl<any>;
  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  toggleClass() {
    if (this.controlValidation.focus) {
      this.setClass('focus');
    } else {
      this.removeClass('focus');
    }

    if (this.checkValidStatus()) {

      this.setClass('has-error');
    } else {
      this.removeClass('has-error');
    }
  }

  ngAfterViewInit() {
    if (this.controlValidation) {
    } this.init();
  }

  checkValidStatus(): boolean {
    if (this.controlValidation) {
      return this.controlValidation.stateErrors;
    }

    return false;
  }

  setClass(value: string): void {
    this.el.nativeElement.classList.add(value);
  }

  removeClass(value: string): void {
    this.el.nativeElement.classList.remove(value);
  }

  init() {
    this.controlValidation.stateChange$
      .subscribe(() => {
        this.toggleClass();
      });
  }

  // @HostBinding('class.has-error') get setClass1() {
  //   if (this.controlValidation) {
  //     return this.controlValidation.stateErrors;
  //   }
  //
  //   return false;
  // }
  // @HostBinding('class.focus') get onClass() {
  //   return this.controlValidation ? this.controlValidation.focus : false;
  // }
}
