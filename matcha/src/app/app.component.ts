import { Component, OnInit, ViewEncapsulation }     from '@angular/core';
import { HttpService }                              from './http/http.service';
import { User }                                     from './users/user';
import { MaterialModule }                           from '@angular/material';
import { MdIconRegistry }                           from '@angular/material';
import { UsersComponent }       from './users/users.component';
import { ProfilComponent }      from './profil/profil.component';
let Users: Array<User>;

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   encapsulation: ViewEncapsulation.None,
})


export class AppComponent implements OnInit{

  title = 'app works';
  bearer: string;
  constructor(public https: HttpService) { }

  ngOnInit(): void {}

}

