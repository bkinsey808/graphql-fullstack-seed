import { Directive, OnChanges, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorDetails, ErrorOptions } from '../bkngerrors';


const toArray = (value: ErrorOptions): string[] =>
  Array.isArray(value) ? value : [value];

@Directive({
  selector: '[bkngErrors]',
  exportAs: 'bkngErrors'
})
export class BkngErrorsDirective
  implements OnChanges, OnDestroy, AfterViewInit {

  subject = new BehaviorSubject<ErrorDetails>(null);

  ready: boolean = false;

  constructor(
    private formGroup: FormGroupDirective,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  get errors() {
    if (!this.ready) return;
    return this.formGroup.errors;
  }

  get hasErrors() {
    return !!this.errors;
  }

  hasError(name: string, conditions: ErrorOptions): boolean {
    return this.checkPropState('invalid', name, conditions);
  }

  isValid(name: string, conditions: ErrorOptions): boolean {
    return this.checkPropState('valid', name, conditions);
  }

  getError(name: string) {
    if (!this.ready) return;
    return this.formGroup.getError(name);
  }

  private checkPropState(
    prop: string, name: string,
    conditions: ErrorOptions
  ): boolean {
    if (!this.ready) return;
    const formGroupPropsState = (
      !conditions || toArray(conditions).every(
        (condition: string) => this.formGroup[condition]
      )
    );
    if (name.charAt(0) === '*') {
      return this.formGroup[prop] && formGroupPropsState;
    }
    return (
      prop === 'valid' ?
        !this.formGroup.hasError(name) :
        this.formGroup.hasError(name) && formGroupPropsState
    );
  }

  private checkStatus() {
    const formGroup = this.formGroup;
    const errors = formGroup.errors;
    this.ready = true;
      if (!errors) return;
    for (const errorName in errors) {
      this.subject.next({ formGroup, errorName });
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnChanges() {
    // this.control = this.form.control.get(this.controlName);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkStatus();
      this.formGroup.statusChanges.subscribe(
        this.checkStatus.bind(this)
      );
    });
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }

}
