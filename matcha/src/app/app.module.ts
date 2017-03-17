// MODULE
import { Injectable }           from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule, Http }     from '@angular/http';
import { MaterialModule }       from '@angular/material';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpService }          from './http/http.service';
// COMPONENT
import { AppComponent }         from './app.component';
import { UsersComponent }       from './users/users.component';
import { ProfilComponent }      from './profil/profil.component';




export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/me', pathMatch: 'full'
    },
    {
        path: 'profil/:id',
        component: ProfilComponent
    },
    {
        path: 'me',
        component: UsersComponent
    }
];

@NgModule({
   imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    UsersComponent,
    ProfilComponent,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}


