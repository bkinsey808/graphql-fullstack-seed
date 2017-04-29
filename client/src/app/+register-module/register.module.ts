import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { RegisterComponent } from './components/register.component';
import { routing } from './register.routing';


@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxErrorsModule,
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
