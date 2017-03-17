import { Component, OnInit }         from '@angular/core';
import { HttpService }               from '../../theme/services/httpService/httpService.service';
import { Profil }                    from './profils';



@Component({
  selector: 'profils',
  templateUrl: './profils.html',
  styleUrls: ['./profils.scss'],
})

export class ProfilsComponent implements OnInit{
  offset = 0;
  limit = 1;
  Profil: Array<Profil>;

   constructor(public https: HttpService) { }

  ngOnInit(): void {
    // if(!this.https.bearer) {
    //       this.https.getBearer()
    //           .subscribe(response => {
    //     let resp = response.json();
    //     this.https.bearer = resp.access_token;
    //     this.https.headers.append('Authorization', 'Bearer ' + this.https.bearer);
    //     this.getUsers();
    //   });
    // } else {
    //   this.getUsers();
    // }
  }

  public getUsers() {
      if(!this.Profil) {
      let sub = this.https.list(this.Profil);
        if (sub) {
          sub.subscribe(
               _users => {
                 console.log(_users[0]);
                 this.Profil = _users;
               });
        }
      }
  }
}
