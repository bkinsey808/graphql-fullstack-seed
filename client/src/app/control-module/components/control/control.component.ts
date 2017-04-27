import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
  forwardRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
  entryComponents: [
    InputComponent,
    TextareaComponent
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ControlComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlComponent implements OnInit, ControlValueAccessor {

  onChange: Function;
  onTouch: Function;
  inputRef: any;
  public messageSource$ = new Subject();

  @Input() label: string;
  @Input() value: any;
  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() focusOnInit: boolean;

  // supported control types
  @Input()
  type: 'text' | 'textarea' | 'username' | 'password' | 'email';

  @ViewChild('input', { read: ViewContainerRef }) input;

  constructor(
    private cfr: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    const componentType: Type<TextareaComponent | InputComponent> =
      this.type === 'textarea' ? TextareaComponent : InputComponent;

    const compFactory = this.cfr.resolveComponentFactory(componentType);
    this.inputRef = this.input.createComponent(compFactory);
    if (this.type === 'password') {
      (<InputComponent>this.inputRef.instance).type = 'password';
    }
    const instance = <TextareaComponent | InputComponent>this.inputRef.instance;
    instance.change.subscribe((value: string) => this.onChange(value));
    instance.blur.subscribe(() => {
      this.onTouch();
      const errors = Object.assign({}, this.formControl.errors);
      this.messageSource$.next(errors);
    });
    instance.focusOnInit = this.focusOnInit;
    this.inputRef.changeDetectorRef.detectChanges();

    this.formControl.valueChanges.subscribe(x => {
      if (this.formControl.touched) {
        this.messageSource$.next(this.formControl.errors);
      }
    });
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }
}
