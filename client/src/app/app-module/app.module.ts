import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApolloModule } from 'apollo-angular';

import { AuthService } from './services/auth.service';
import { RegisterModule } from 'app/+register-module/register.module';
import { AppRoutingModule } from '../app-routing-module/app-routing.module';
import { AppComponent } from './components/app.component';
import { getClient } from './client';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  bootstrap: [ AppComponent ],

  // modules go here
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ApolloModule.withClient(getClient),
  ],

  // services go here
  providers: [ AuthService ],

  // components go here
  declarations: [
    AppComponent,
    UsersComponent
  ],

})

export class AppModule { }
