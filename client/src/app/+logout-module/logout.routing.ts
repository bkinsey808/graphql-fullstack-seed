import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutComponent } from './components/logout.component';

const routes: Routes = [{
  path: '',
  component: LogoutComponent
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
