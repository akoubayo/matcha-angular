import { Routes, RouterModule }  from '@angular/router';

import { ProfilsComponent } from './profils.component';
import { UserComponent } from './component/user/user.component';
import { ListProfilsComponent } from './component/listprofils/listProfils.component';
import { ChartCustomComponent } from './component/chartCustom/chartCustom.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProfilsComponent,
    children: [
      { path: '', component: ListProfilsComponent},
      { path: ':id', component: UserComponent }
    ],
  }
];

export const routing = RouterModule.forChild(routes);
