import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
  forwardRef
} from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';


@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  entryComponents: [
    InputComponent,
    TextareaComponent
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FieldComponent),
    multi: true
  }]
})
export class FieldComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() name: string;
  @Input('value') _value: any;
  @Input() formControl: FormControl;

  // supported field types
  @Input() type: 'text' | 'textarea' | 'username' | 'password' | 'email';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    const componentType: Type<TextareaComponent | InputComponent> =
      this.type === 'textarea' ? TextareaComponent : InputComponent;

    const compFactory = this.cfr.resolveComponentFactory(componentType);
    const ref = this.viewContainerRef.createComponent(compFactory);
    ref.instance.name = this.name;
    console.log(this.label);
    console.log(this.name);
    console.log(this.type);
    if (this.type === 'password') {
      (<InputComponent>ref.instance).type = 'password';
    }
    ref.instance.formControl = this.formControl;
    ref.changeDetectorRef.detectChanges();
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn) {
  }

  registerOnTouched(fn) {
  }
}

