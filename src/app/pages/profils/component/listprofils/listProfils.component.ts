import { Component, OnInit }         from '@angular/core';
import { HttpService }               from '../../../../theme/services/httpService/httpService.service';
import { Profil }                    from '../../profils';

let profil: Array<Profil>;
let search: Object = {};

@Component({
  selector: 'profils',
  templateUrl: './listProfils.html',
  styleUrls: ['./listProfils.scss'],
})

export class ListProfilsComponent implements OnInit{
  public offset = 0;
  public limit = 1;
  public search: Object = {};
  public Profil: Array<Profil> = null;
  public default_yeux = '';
  public default_cheveux = '';
  constructor(public https: HttpService) {}

  ngOnInit(): void {
     // $.getJSON("http://jsonip.com/?callback=?", function (data) {
     //      console.log(data);
     //     // alert(data.ip);
     // });
    // $.getJSON("http://www.ip-tracker.org/locator/ip-lookup.php?ip=109.11.188.152", function(data) {
    //   console.log('=====================')
    //   console.log(data)
    // })
    $.get("https://ipinfo.io", function(response) {
      console.log(response)
  console.log(response.ip, response.country);
}, "jsonp")
    this.createSearch(null);
  }

  //Contruire la recherche
  public createSearch(event)
  {
    let where = '';
    this.search = search;
    if(event !== null) {
      this.search[event.target.name] = event.target.value;
      search = this.search;
    }
    if (Object.keys(search).length > 0) {
      where += 'where=';
      for (let key in this.search) {
        if(this.search[key] != '') {
          where += key + ':=:' + this.search[key]+';';
          this['default_'+ key] = this.search[key];
        }
      }
    }
    console.log(where)
    this.getUsers(where);
  }

  //On récupère tous les profils qui corresponde
  public getUsers(search = '') {
    let sub = this.https.list(search).subscribe(_users => {
            profil = _users;
            this.Profil = profil;
    });
  }
}
