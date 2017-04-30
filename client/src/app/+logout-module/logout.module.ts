import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LogoutComponent } from './components/logout.component';
import { routing } from './logout.routing';

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LogoutComponent
  ]
})
export class LogoutModule { }
