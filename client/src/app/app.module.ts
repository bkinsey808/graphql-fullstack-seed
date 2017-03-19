import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ApolloModule.withClient(getClient),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
