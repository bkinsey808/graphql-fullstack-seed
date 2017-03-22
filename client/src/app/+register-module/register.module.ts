import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { ControlModule } from 'app/control-module/control.module';
import { RegisterComponent } from './components/register.component';
import { routing } from './register.routing';

@NgModule({
  imports: [
    routing,
    CommonModule,
    ControlModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
