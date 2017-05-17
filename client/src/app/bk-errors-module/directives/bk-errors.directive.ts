import {
  Directive, OnInit, OnChanges, OnDestroy, AfterViewInit, ChangeDetectorRef,
  SimpleChange, Input, Output, ContentChild, Renderer2, ElementRef, EventEmitter
} from '@angular/core';
import { FormGroupDirective, AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/scan';

@Directive({
  selector: '[bkErrors]',
  exportAs: 'bkErrors'
})
export class BkErrorsDirective implements OnInit, OnDestroy {

  @Input('bkErrors') formControlName: string;
  @Output() onCurrencyEvent = new EventEmitter();

  public errors$: Observable<any>;
  public formControlChanges$: Subject<any>;

  private control: AbstractControl;
  private destroyFocusListener: () => void;
  private destroyBlurListener: () => void;

  constructor(
    private formGroup: FormGroupDirective,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    // console.log('formGroup', formGroup);
    // console.log('elementRef', elementRef);
    // console.log('renderer', renderer);
  }

  ngOnInit() {
    console.log('init');
  }

  getCommonControlProperties() {
    return {
      status: this.control.status,
      touched: this.control.touched,
      untouched: this.control.untouched,
      dirty: this.control.dirty,
      pristine: this.control.pristine,
    }
  }

  ngAfterViewInit() {
    const selector = `[formControlName=${this.formControlName}]`;
    const input = this.elementRef.nativeElement.querySelector(selector);
    this.control = this.formGroup.form.controls[this.formControlName];

    this.formControlChanges$ = new Subject();

    this.destroyFocusListener = this.renderer.listen(input, 'focus', (evt) => {
      this.formControlChanges$.next({
        focused: true,
        blurred: false,
      });
    });
    this.destroyBlurListener = this.renderer.listen(input, 'blur', (evt) => {
      this.formControlChanges$.next({
        focused: false,
        blurred: true,
        ...this.getCommonControlProperties()
      });
    });
    this.control.valueChanges.subscribe({
      next: () => this.formControlChanges$.next(
        this.getCommonControlProperties()
      ),
      // error: err => console.log('err'),
      // complete: () => console.log('complete')
    });

    this.formControlChanges$
      .distinctUntilChanged((x, y) =>
        JSON.stringify(x) === JSON.stringify(y)
      )
      .scan((accumulator, value) =>
        // note that the {} is necessary to make this a pure function
        Object.assign({}, accumulator, value)
      , {}
      )
      .subscribe({
        next: (value) => console.log('GOT IT: ', value)
      });
  }

  ngOnDestroy() {
    console.log('destroy');
    this.destroyFocusListener();
    this.destroyBlurListener();
  }
}
