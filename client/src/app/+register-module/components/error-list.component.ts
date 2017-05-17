import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-list',
  template: `
    <div ngxErrors="control">
      <div *ngFor="let error of errors | async" [ngxError]="error.error" [when]="error.rules">
        <small>{{ error.text }}</small>
      </div>
    </div>
  `
})
export class ErrorListComponent {

  @Input() control: string;

  errors = [
    {
      error: ['required'],
      text: 'This field is required',
      rules: ['touched', 'dirty']
    },
    {
      error: ['minlength', 'maxlength'],
      text: 'Min length is 2, max length is 3',
      rules: ['dirty'] },
    {
      error: ['pattern'],
      text: 'Format email invalid',
      rules: ['touched']
    }
  ];

  constructor(){
  }
}
