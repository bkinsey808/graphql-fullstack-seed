import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './components/dashboard.component';
import { routing } from './dashboard.routing';

@NgModule({
  imports: [
    routing,
    CommonModule,
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
