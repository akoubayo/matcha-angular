import { Component, OnInit }         from '@angular/core';
import { HttpService }               from '../../../../theme/services/httpService/httpService.service';
import { Profil }                    from '../../profils';

let profil: Array<Profil>;

@Component({
  selector: 'profils',
  templateUrl: './listProfils.html',
  styleUrls: ['./listProfils.scss'],
})


export class ListProfilsComponent implements OnInit{
  offset = 0;
  limit = 1;
  public Profil: Array<Profil> = null;

   constructor(public https: HttpService) {}

  ngOnInit(): void {
    // if(!this.https.bearer) {
    //       this.https.getBearer({})
    //           .subscribe(response => {
    //     let resp = response.json();
    //     this.https.bearer = resp.access_token;
    //     this.https.headers.append('Authorization', 'Bearer ' + this.https.bearer);
    //     this.getUsers();
    //   });
    // } else {
    //   this.getUsers();
    // }
    this.getUsers();
  }

  public getUsers() {
      if(!profil) {
      let sub = this.https.list(profil);
        if (sub) {
          sub.subscribe(
               _users => {
                 profil = _users;
                 this.Profil = profil;
               });
        }
      } else {
        this.Profil = profil;
      }
  }
}
