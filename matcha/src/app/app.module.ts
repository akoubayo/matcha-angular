// MODULE
import { Injectable }           from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule, Http }           from '@angular/http';
import { MaterialModule }       from '@angular/material';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpService }          from './http/http.service';
// COMPONENT
import { AppComponent }         from './app.component';
import { UsersComponent }        from './users/users.component';
import { SideNavComponent }     from './sidenav/sidenav.component'


const appRoutes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'me',
        component: UsersComponent
    }
];

@NgModule({
   imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    MaterialModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    UsersComponent,
    SideNavComponent
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}


