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
import { ControlMessagesComponent } from './control-messages/control-messages.component';


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

  onChange: Function;
  onTouch: Function;

  @Input() label: string;
  @Input('value') _value: any;
  @Input() formControl: FormControl;

  // supported field types
  @Input()
  type: 'text' | 'textarea' | 'username' | 'password' | 'email';

  @ViewChild(ControlMessagesComponent)
  controlMessages: ControlMessagesComponent;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const componentType: Type<TextareaComponent | InputComponent> =
      this.type === 'textarea' ? TextareaComponent : InputComponent;

    const compFactory = this.cfr.resolveComponentFactory(componentType);
    const ref = this.viewContainerRef.createComponent(compFactory);
    if (this.type === 'password') {
      (<InputComponent>ref.instance).type = 'password';
    }
    ref.instance.formControl = this.formControl;
    (<Subject<string>>ref.instance.change).subscribe((value) => {
      this.onChange(value);
    });
    (<Subject<null>>ref.instance.blur).subscribe((value) => {
      this.onTouch();
    });
    ref.changeDetectorRef.detectChanges();
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
