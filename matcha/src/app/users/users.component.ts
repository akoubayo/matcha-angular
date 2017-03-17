import { Component, OnInit }      from '@angular/core';
import { HttpService }            from '../http/http.service';
import { DomSanitizer }           from '@angular/platform-browser';
import { User }                   from '../users/user';
import {MdIconRegistry}           from '@angular/material';
let Users: Array<User>;
let titi: string = 'tutu';
@Component({
  selector: 'users',
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})


export class UsersComponent implements OnInit {

  title = 'ok pour le test';
  offset = 0;
  limit = 1;
  Users: Array<User>;

  constructor(iconRegistry: MdIconRegistry,sanitizer: DomSanitizer, public https: HttpService, public san: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit(): void {
    if(!this.https.bearer) {
          this.https.getBearer()
              .subscribe(response => {
        let resp = response.json();
        this.https.bearer = resp.access_token;
        this.https.headers.append('Authorization', 'Bearer ' + this.https.bearer);
        this.getUsers();
      });
    } else {
      this.getUsers();
    }
  }


  public getUsers() {
      if(!this.Users) {
      let sub = this.https.list(Users);
        if (sub) {
          sub.subscribe(
               _users => {
                 console.log(_users[0]);
                 this.Users = _users;
               });
              // error =>  console.log(error));
        }
      }
  }

  public sanitize(url:string){
    url = 'http://localhost:8000/'+url;
    return this.san.bypassSecurityTrustStyle('url('+url+')');
  }

}
