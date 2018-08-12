import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';

@Injectable()
export class HandlerErrorService {
  private static readonly errorMessages = {
    'isNegative': () => 'this field is not have negative value',
    'patternUrl': () => 'Url pattern is invalid',
    'strEmpty': () => 'This field is not have only spaces',
    'required': () => 'This field is required',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message,
    'patternEmail' : () => 'Is not correct email',
    'passwordMatch': () => 'Passwords do not match',
    'lessValue': () => 'Choose bigger number',
    'maxValue': (params) => 'Max value is ' + params,
    'minValue': (params) => 'Min value is ' + params,
    'timeDecimalError': (params) => 'Incorrect time format',
  };
  constructor() {
  }

  public getError(control: NgControl) {
    const errors = [];
   return Object.keys(control.errors);
      // .map(field => {
      //   console.log('File name', field);
      //   console.log(this.addErrors(field, errors));
      //   return field;
      //   //return this.getMessage(field, control.errors[field]);
      // });
  }

  public getMessage(type: string, params: any) {
    return HandlerErrorService.errorMessages[type](params);
  }

  private addErrors(fieldName: string, fields: string[] ): string[] {
    fields.push(fieldName);

    return fields;


  }
}
