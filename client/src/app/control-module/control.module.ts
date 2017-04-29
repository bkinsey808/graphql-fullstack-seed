import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationService } from '../app-module/services/validation.service';
import { AppMessagesComponent } from './components/control/messages/messages.component';
import { ControlComponent } from './components/control/control.component';
import { InputComponent } from './components/control/input/input.component';
import { TextareaComponent } from './components/control/textarea/textarea.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ControlComponent,
    AppMessagesComponent,
  ],
  declarations: [
    ControlComponent,
    AppMessagesComponent,
    InputComponent,
    TextareaComponent
  ],
  providers: [ ValidationService ]
})
export class ControlModule { }
