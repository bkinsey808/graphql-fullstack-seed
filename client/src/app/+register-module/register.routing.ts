import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register.component';

const routes: Routes = [{
  path: '',
  component: RegisterComponent
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
