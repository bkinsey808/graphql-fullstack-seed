import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@ng2-dynamic-forms/core';
import { DynamicFormsMaterialUIModule } from '@ng2-dynamic-forms/ui-material';
import { MaterialModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';

import { FocusFixDirective } from './directives/focus-fix.directive';

const dependencies = [ FocusFixDirective ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsMaterialUIModule,
    TextMaskModule,
  ],
  declarations: [...dependencies],
  exports: [
    ...dependencies,
    ReactiveFormsModule,
    MaterialModule,
    DynamicFormsMaterialUIModule,
    TextMaskModule,
  ],
  providers: [],
})
export class AppFormModule { }
