import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HttpService } from './theme/services/httpService/httpService.service';
import { App } from './app.component';
import {AboutUsersResolve} from './about-resolve.service'


export const routes: Routes = [
  { path: '', redirectTo: 'pages/profils/me', pathMatch: 'full'},
  { path: '**', redirectTo: 'pages/profils/me' },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
