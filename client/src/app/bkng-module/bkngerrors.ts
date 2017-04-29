import { FormGroupDirective } from '@angular/forms';

export type ErrorOptions = string | string[];

export interface ErrorDetails {
  formGroup: FormGroupDirective,
  errorName: string
}
