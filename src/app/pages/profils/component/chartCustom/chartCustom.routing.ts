import { Routes, RouterModule }  from '@angular/router';
import { chartCustomComponent } from './listProfils.component';

const routes: Routes = [
  {
    path: '',
    component: chartCustomComponent
  }
];

export const routing = RouterModule.forChild(routes);
