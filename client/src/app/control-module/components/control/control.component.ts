import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
  forwardRef,
  ViewChild
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
  }]
})
export class ControlComponent implements OnInit, ControlValueAccessor {

  onChange: Function;
  onTouch: Function;

  @Input() label: string;
  @Input('value') _value: any;
  @Input() formControl: FormControl;

  // supported control types
  @Input()
  type: 'text' | 'textarea' | 'username' | 'password' | 'email';

  @ViewChild('input', {read: ViewContainerRef}) input;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const componentType: Type<TextareaComponent | InputComponent> =
      this.type === 'textarea' ? TextareaComponent : InputComponent;

    const compFactory = this.cfr.resolveComponentFactory(componentType);
    const inputRef = this.input.createComponent(compFactory);
    if (this.type === 'password') {
      (<InputComponent>inputRef.instance).type = 'password';
    }
    (<Subject<string>>inputRef.instance.change).subscribe((value: string) => {
      this.onChange(value);
    });
    (<Subject<null>>inputRef.instance.blur).subscribe(() => {
      this.onTouch();
    });
    inputRef.changeDetectorRef.detectChanges();
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }
}
