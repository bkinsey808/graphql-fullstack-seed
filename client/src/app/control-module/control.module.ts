import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationService } from './services/validation.service';
import { ControlMessagesComponent } from './components/control/control-messages/control-messages.component';
import { ControlComponent } from './components/control/control.component';
import { InputComponent } from './components/control/input/input.component';
import { TextareaComponent } from './components/control/textarea/textarea.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ ControlComponent ],
  declarations: [
    ControlComponent,
    ControlMessagesComponent,
    InputComponent,
    TextareaComponent
  ],
  providers: [ ValidationService ]
})
export class ControlModule { }
