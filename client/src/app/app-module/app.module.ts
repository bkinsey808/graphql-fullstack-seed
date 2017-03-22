import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApolloModule } from 'apollo-angular';

import { RegisterModule } from 'app/+register-module/register.module';
import { AppRoutingModule } from '../app-routing-module/app-routing.module';
import { AppComponent } from './components/app.component';
import { getClient } from './client';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ApolloModule.withClient(getClient),
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
