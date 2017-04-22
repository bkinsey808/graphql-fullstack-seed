import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { ControlModule } from 'app/control-module/control.module';
import { LoginComponent } from './components/login.component';
import { routing } from './login.routing';


@NgModule({
  imports: [
    routing,
    CommonModule,
    ControlModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxErrorsModule,
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
