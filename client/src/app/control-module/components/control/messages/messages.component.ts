import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import {
  Form,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ValidationService } from '../../../services/validation.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMessagesComponent implements OnInit {

  public messages: Observable<any>;

  @Input() messageSource: Observable<any>;

  constructor() {
  }

  ngOnInit() {
    this.messages = this.messageSource.map(
      x => x && Object.keys(x).length > 0 ? JSON.stringify(x) : ''
    );
  }

  // get errorMessage() {
  //   // todo write this without a loop
  //   for (let propertyName in this.messageSource.errors) {
  //     if (
  //       this.messageSource.errors.hasOwnProperty(propertyName) &&
  //       this.messageSource.touched
  //     ) {
  //       return ValidationService.getValidatorErrorMessage(
  //         propertyName,
  //         this.messageSource.errors[propertyName]
  //       );
  //     }
  //   }

  //   return null;
  // }

  get showMessages() {
    return true;
  }
}


