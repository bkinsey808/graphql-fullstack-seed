import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlModule } from 'app/control-module/control.module';
import { DashboardComponent } from './components/dashboard.component';
import { routing } from './dashboard.routing';

@NgModule({
  imports: [
    routing,
    CommonModule,
    ControlModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
