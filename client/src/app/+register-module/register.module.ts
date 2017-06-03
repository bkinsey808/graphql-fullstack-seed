import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFormModule } from '../app-form-module/app-form.module'
import { routing } from './register.routing';
import { RegisterComponent } from './components/register.component';

@NgModule({
  imports: [
    routing,
    CommonModule,
    AppFormModule,
  ],
  declarations: [
    RegisterComponent,
  ],
})
export class RegisterModule { }
