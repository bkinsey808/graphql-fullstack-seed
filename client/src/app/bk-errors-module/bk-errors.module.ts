import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BkErrorsDirective } from './directives/bk-errors.directive';
import { InputDirective } from './directives/input.directive';


const dependencies = [ BkErrorsDirective, InputDirective ];

@NgModule({
  imports: [ CommonModule ],
  declarations: [...dependencies],
  exports: [...dependencies],
  providers: []
})
export class BkErrorsModule { }
