import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ValidationService } from 'app/app-module/services/validation.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMessagesComponent implements OnInit {

  public message$: Observable<any>;

  @Input('messageSource') messageSource$: Observable<any>;

  constructor() {}

  ngOnInit() {
    this.message$ = this.messageSource$
      .scan((obj, err) => Object.assign(obj, err), {})
      .map((obj => {
        return Object.keys(obj)
          .reduce((errorArray, key) => {
            try {
              if (obj[key]) {
                errorArray.push(ValidationService.getValidatorErrorMessage(key))
              }
            } catch(e) {
              console.log('err here', e);
            }
            return errorArray;
          }, []).join(' ');
      }));
  }
}


