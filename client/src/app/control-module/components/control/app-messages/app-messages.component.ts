import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ValidationService } from '../../../services/validation.service';


@Component({
  selector: 'app-messages',
  templateUrl: './app-messages.component.html',
  styleUrls: ['./app-messages.component.css']
})
export class AppMessagesComponent {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    // todo write this without a loop
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
