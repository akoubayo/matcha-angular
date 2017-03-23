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
  templateUrl: './user.html'
})
export class UserComponent implements OnInit{

    public   pieColor;
    public   charts: Array<Object>;
    private  _init = false;
    public   profil: Profil;
    public   id: number;
    private  sub: any;
    public   chartTab: Array<Object>;
    public   items = [];
    public range = (value) => {
       let a = []; for(let i = 40; i < value; ++i) { a.push(i+1) } return a;
    }

    constructor(public https: HttpService, private _baConfig:BaThemeConfigProvider, private route: ActivatedRoute) {
      this.pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    }

    ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      });
      this.getprofil();
    }

    getprofil(): void {
        if(!profilList[this.id]) {
        let sub = this.https.getProfil(this.id);
          if (sub) {
            sub.subscribe(
                 _users => {
                   profilList[this.id] = _users[0];
                   this.profil = profilList[this.id];
                   if (!this.profil) {
                     this.profil = null;
                     return;
                   }
                   console.log(this.profil);
                   this.generateChartObject();
                 });
          }
        } else {
          this.profil = profilList[this.id];
          if (!this.profil) {
             this.profil = null;
             return;
          }
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

    public editUser(type:String){
      this[type] = true;
    }

    public changeValue(type:String){
      let data:Object = {};
      data[type] = this.profil[type];
      this.https.updateProfil(data).subscribe(
                 _update => {

                 });
      this[type] = false;
    }

    public nl2br() {
      let ret;
      ret = this.profil.description.replace(/(\\')/g, '\'');
      ret = ret.replace(/(?:\r\n|\r|\n)/g, '<br />');
      return ret;
    }

    public addTags($event) {
      this.https.addTags({nameTags: $event.name}).subscribe(
                 _tag => {
                   this.profil.tags.push({id: _tag.id, name: _tag.name})
                 });
    }

    public deleteTags($event) {
      this.https.deleteTags($event.id).subscribe(
                 _tag => {
                   let newProfilTags = [];
                   for (let i = 0; i < (this.profil.tags.length - 1); i++) {
                     if (this.profil.tags[i].name != $event.name) {
                       newProfilTags.push(this.profil.tags[i]);
                     }
                   }
                   this.profil.tags = newProfilTags;
                 });
    }
}
