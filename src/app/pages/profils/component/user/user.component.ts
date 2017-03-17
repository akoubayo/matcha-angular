import { Component, OnInit }                   from '@angular/core';
import { HttpService }                         from '../../../../theme/services/httpService/httpService.service';
import { Profil }                              from '../../profils';
import { BaThemeConfigProvider, colorHelper }  from '../../../../theme';
import { charCustomComponent}                  from '../chartCustom/chartCustom';
import { ActivatedRoute }                      from '@angular/router';
import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./user.scss';

let profilList = [];

@Component({
  selector: 'user',
  templateUrl: './user.html',
})
export class UserComponent implements OnInit{

    public   pieColor;
    public   charts: Array<Object>;
    private  _init = false;
    public   profil: Profil;
    public   id: number;
    private  sub: any;
    public   chartTab: Array<Object>;

    constructor(public https: HttpService, private _baConfig:BaThemeConfigProvider, private route: ActivatedRoute) {
      this.pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    }

    ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      });
      if(!this.https.bearer) {
            this.https.getBearer()
                .subscribe(response => {
          let resp = response.json();
          this.https.bearer = resp.access_token;
          this.https.headers.append('Authorization', 'Bearer ' + this.https.bearer);
          this.getprofil();
        });
      } else {
        this.getprofil();
      }
    }

    getprofil(): void {
        if(!profilList[this.id]) {
        let sub = this.https.getProfil(this.id);
          if (sub) {
            sub.subscribe(
                 _users => {
                   console.log(_users);
                   profilList[this.id] = _users[0];
                   this.profil = profilList[this.id];
                   this.generateChartObject();
                 });
          }
        } else {
          this.profil = profilList[this.id];
          this.generateChartObject();
        }
    }

    public generateChartObject(): void {
      this.chartTab = [
        {id:'pop', pourc:'30', title:'Popularité<p class="small-chart">sur 16540 profils</p>', icon:'person'},
        {id:'like', pourc:this.profil.nbLikes, title:'Nombre de like<p>' + this.profil.nbLikes + '</p>', icon:'pause'},
        {id:'match', pourc:'50', title:'Match<p>50% de match</p>', icon:'face'},
        {id:'vue', pourc:this.profil.nbshows, title:'Vue<p>50% des tops profils</p>', icon:'eye'},
      ]
    }
}
