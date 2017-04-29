import { Injectable } from '@angular/core';
import {
  AbstractControl,
  ValidatorFn
} from '@angular/forms';

@Injectable()
export class ValidationService {

  static getValidatorErrorMessage(
    validatorName: string,
    validatorValue: any = {}
  ) {
    console.log('validator value: ', validatorValue);
    const config = {
      'required': `${validatorValue.controlName} Required`,
      'invalidEmailAddress': 'Invalid email address',
      'loginFailed': 'Login failed. Check your username or email address, or password.',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static emailValidator(control) {
    // RFC 2822 compliant
    // tslint:disable-next-line
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static minAndMaxLengthValidator(options): ValidatorFn {
    return (control: AbstractControl): {
      [key: string]: any
    } => {
      if (
        control.value.length > options.maxLength ||
        control.value.length < options.minLength
      ) {
        return { minAndMaxLengthError: options };
      }
      return null;
    }
  }

  constructor() { }

}
