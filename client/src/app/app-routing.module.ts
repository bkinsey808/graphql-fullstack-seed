import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';


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
