import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { BkngErrorsDirective } from './directives/bkngerrors.directive';
import { BkngErrorDirective } from './directives/bkngerror.directive';

import { ValidationService } from 'app/app-module/services/validation.service';


const dependencies = [ BkngErrorsDirective, BkngErrorDirective ];

@NgModule({
  imports: [ CommonModule, NgxErrorsModule ],
  declarations: [...dependencies],
  exports: [...dependencies],
  providers: [ ValidationService ]
})
export class BkngModule { }
