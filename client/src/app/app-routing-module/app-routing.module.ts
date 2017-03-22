import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from '../app-module/components/users/users.component';


const routes: Routes = [{
  path: '',
  loadChildren: '../+home-module/home.module#HomeModule'
}, {
  path: 'login',
  loadChildren: '../+login-module/login.module#LoginModule'
}, {
  path: 'logout',
  loadChildren: '../+logout-module/logout.module#LogoutModule'
}, {
  path: 'register',
  loadChildren: '../+register-module/register.module#RegisterModule'
}, {
  path: 'dashboard',
  loadChildren: '../+dashboard-module/dashboard.module#DashboardModule'
}, {
  path: 'users',
  component: UsersComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
