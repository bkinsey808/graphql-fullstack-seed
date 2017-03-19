import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/+home/home.component';
import { LoginComponent } from './components/+login/login.component';
import { LogoutComponent } from './components/+logout/logout.component';
import { RegisterComponent } from './components/+register/register.component';
import { DashboardComponent } from './components/+dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [{
  path: '', component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'logout',
  component: LogoutComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'users',
  component: UsersComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
