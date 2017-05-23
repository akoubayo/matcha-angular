import { Routes, RouterModule }  from '@angular/router';

import { Deconnexion } from './deconnexion.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Deconnexion
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
