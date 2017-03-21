import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApolloModule } from 'apollo-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { getClient } from './client';
import { HomeComponent } from './components/+home/home.component';
import { LoginComponent } from './components/+login/login.component';
import { LogoutComponent } from './components/+logout/logout.component';
import { DashboardComponent } from './components/+dashboard/dashboard.component';
import { RegisterComponent } from './components/+register/register.component';
import { UsersComponent } from './components/users/users.component';
import { ValidationService } from './services/validation.service';
import { ControlMessagesComponent } from './components/control/control-messages/control-messages.component';
import { ControlComponent } from './components/control/control.component';
import { InputComponent } from './components/control/input/input.component';
import { TextareaComponent } from './components/control/textarea/textarea.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    RegisterComponent,
    ControlComponent,
    ControlMessagesComponent,
    InputComponent,
    TextareaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    ApolloModule.withClient(getClient),
  ],
  providers: [ ValidationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
