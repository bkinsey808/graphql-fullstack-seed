import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home.component';
import { routing } from './home.routing';


@NgModule({
  imports: [ routing, CommonModule ],
  declarations: [ HomeComponent ]
})
export class HomeModule {}
