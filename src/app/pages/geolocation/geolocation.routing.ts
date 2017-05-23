import { Routes, RouterModule }  from '@angular/router';
import { GeolocationComponent } from './geolocation.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: GeolocationComponent,
     children: [

    ]
  }
];

export const routing = RouterModule.forChild(routes);
