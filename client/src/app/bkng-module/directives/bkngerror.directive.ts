import { Directive, Input, OnInit, OnDestroy, DoCheck, Inject, HostBinding, forwardRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ErrorOptions } from '../bkngerrors';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';

import { BkngErrorsDirective } from './bkngerrors.directive';


const toArray = (value: ErrorOptions): string[] =>
  Array.isArray(value) ? value : [value];

@Directive({
  selector: '[bkngError]'
})
export class BkngErrorDirective
  implements OnInit, OnDestroy, DoCheck {

  @Input() set bkngError(value: ErrorOptions) {
    this.errorNames = toArray(value);
  }

  @Input() set when(value: ErrorOptions) {
    this.rules = toArray(value);
  }

  @HostBinding('hidden')
  hidden: boolean = true;

  rules: string[] = [];

  errorNames: string[] = [];

  subscription: Subscription;

  _states: Subject<string[]>;

  states: Observable<string[]>;

  constructor(
    @Inject(forwardRef(() => BkngErrorsDirective))
      private bkngErrors: BkngErrorsDirective
  ) { }

  ngOnInit() {

    this._states = new Subject<string[]>();
    this.states = this._states
      .asObservable()
      .distinctUntilChanged();

    const errors = this.bkngErrors.subject
      .filter(Boolean)
      .filter(obj => !!~this.errorNames.indexOf(obj.errorName));

    const states = this.states
      .map(states => this.rules.every(
        rule => !!~states.indexOf(rule)
      ));


    this.subscription = Observable.combineLatest(states, errors)
      .subscribe(([states, errors]) => {
        this.hidden = !(states && errors.formGroup.hasError(
          errors.errorName
        ));
      });

  }

  ngDoCheck() {
    this._states.next(
      this.rules.filter((rule) =>
        (this.bkngErrors as any).formGroup[rule]
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
