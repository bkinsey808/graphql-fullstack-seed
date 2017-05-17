import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { RegisterComponent } from './components/register.component';
import { RegisterFormErrorComponent } from './components/register-form-error.component';
import { RegisterEmailErrorComponent } from './components/register-email-error.component';
import { RegisterUsernameErrorComponent } from './components/register-username-error.component';
import { ErrorListComponent } from './components/error-list.component';
import { BkErrorsModule } from '../bk-errors-module/bk-errors.module';


import { routing } from './register.routing';


@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxErrorsModule,
    BkErrorsModule,
  ],
  declarations: [
    RegisterComponent,
    RegisterFormErrorComponent,
    RegisterEmailErrorComponent,
    RegisterUsernameErrorComponent,
    ErrorListComponent,
  ]
})
export class RegisterModule { }
