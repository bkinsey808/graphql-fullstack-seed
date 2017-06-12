import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { routing } from './login.routing'
import { AppFormModule } from '../app-form-module/app-form.module'
import { LoginComponent } from './components/login.component'

@NgModule({
  imports: [routing, CommonModule, AppFormModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
