import { Routes, RouterModule }  from '@angular/router';
import { ListProfilsComponent } from './listProfils.component';

const routes: Routes = [
  {
    path: '',
    component: ListProfilsComponent
  }
];

export const routing = RouterModule.forChild(routes);
