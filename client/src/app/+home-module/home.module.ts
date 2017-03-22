import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlModule } from 'app/control-module/control.module';
import { HomeComponent } from './components/home.component';
import { routing } from './home.routing';

@NgModule({
  imports: [
    routing,
    CommonModule,
    ControlModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
