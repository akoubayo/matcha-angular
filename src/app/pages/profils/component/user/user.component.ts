import { Component, OnInit, Directive }        from '@angular/core';
import { HttpService }                         from '../../../../theme/services/httpService/httpService.service';
import { Profil }                              from '../../profils';
import { BaThemeConfigProvider, colorHelper }  from '../../../../theme';
import { charCustomComponent}                  from '../chartCustom/chartCustom';
import { ActivatedRoute }                      from '@angular/router';
import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./user.scss';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { BaPageTop}                            from '../../../../theme/components/baPageTop';
import { GlobalState }                         from '../../../../global.state';
import { Notif }                               from '../../../../theme/components/baMsgCenter/notif';
import { BirthdayConvertPipe }                 from './birthday.pipe';
import {IMyOptions}                            from 'mydatepicker';

let profilList = [];

@Directive({ selector: '[ng2FileSelect]' });

@Component({
  selector: 'user',
  templateUrl: './user.html',
  styleUrls:  ['./user.scss']
})


export class UserComponent implements OnInit{

    public   uploader:FileUploader;
    public   pieColor;
    public   charts: Array<Object>;
    private  _init = false;
    public   profil: Profil;
    public   id;
    private  sub: any;
    public   chartTab: Array<Object>;
    public   items = [];
    public   like = 'No';
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;
    public photoProfil:BaPageTop;
    public clickUploadFile = false;
    public notifs:Array<Notif>;    // Calendrier date birthday
    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd-mm-yyyy',
        inline    : true
    };
    private model: Object = { };
    public search_city;
    constructor(public https: HttpService, private _baConfig:BaThemeConfigProvider, private route: ActivatedRoute, public globalState:GlobalState) {
      this.pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
      this.photoProfil = new BaPageTop(this.globalState);
      this.uploader = new FileUploader({
        url: 'http://localhost:8000/photos',
        authToken:'',
        itemAlias:'photo',
        headers:[{name:'authorization',value: 'Bearer ' + this.https.bearer}],
      });
    }

    ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
        this.id = params['id'];
        this.getprofil();
        if (this.id == 'me') {
          this.https.getNotif('all').subscribe(resp => {
            this.notifs = resp;
            console.log(this.notifs);
          });
        }
      });

    }

    getprofil(): void {
        if(!profilList[this.id]) {
        let sub = this.https.getProfil(this.id);
          if (sub) {
            sub.subscribe(
                 _users => {
                   profilList[this.id] = _users[0];
                   this.profil = profilList[this.id];
                   this.getLike();
                   if (!this.profil) {
                     this.profil = null;
                     return;
                   }
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
      if(type == 'birthday') {
        let b = this.profil.birthday.split('-');
        this.model = {date: { year: +b[0], month: +b[1], day: +b[2] }};
      }
      if(this[type] == true){
        this[type] = false;
      } else {
        this[type] = true;
      }
    }

    public changeValue(type:String,event = null){
      let data:Object = {};
      if (type == 'birthday') {
        console.log(event);
        this.profil[type] = event.date['year'] + '-' + event.date['month'] + '-' + event.date['day'];
      }
      data[type] = this.profil[type];
      console.log(data[type]);
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

    public getLike() {
      for (let p of this.profil.visitorLikes) {
          if (p.id_profils == this.https.me.id_profils) {
              this.like = 'Yes';
          }
      };
    }

    public setLike() {
      this.https.setLike({'id':this.profil.id_profils}).subscribe(res => {
          if(res.error) {
            alert(res.error);
          } else {
            this.like = 'Yes';
          }
      });
    }


    public fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e:any):void {
      this.hasAnotherDropZoneOver = e;
    }

    public addPhotoProfil()
    {
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        var responsePath = JSON.parse(response);
        this.photoProfil.setImgProfil('http://localhost:8000/'+ responsePath.small);
        let update = this.https.updatePhotoProfil(responsePath.id_photos).subscribe(data => {
          this.profil.photoProfil = responsePath;
        });
        this.profil.photo.push(responsePath);
        this.clickUploadFile = false;
      };
    }

    public triggerUpload() {
      if(this.id == 'me') {
        $('#inputFile').trigger('click');
        this.clickUploadFile = true;
      }
    }

    public getNotif() {
      console.log('je passe ici');
    }
    // Pour l'input du POid
    public range = (value) => {
       let a = []; for(let i = 40; i < value; ++i) { a.push(i+1) } return a;
    }
    // Pourl'input de la taille
    public tailleInput = (value) => {
        let metre = 1;
        let ret;
        let a = []; for(let i = 0; i < value; i += 5) {
          if(i < 10)
            ret = '0' + i;
          else
            ret = i;
          a.push(ret)
       }
       return a;
    }

    //Rechercher les villes en direct
    public searchCity() {
      console.log('toto');
      if(this.profil.ville.length > 3) {
        this.https.searchCity(this.profil.ville).subscribe(resp => {
          console.log(resp.length);
          if (resp.length > 0) {
            this.search_city = resp;
          } else {
            this.search_city = false;
          }
        });
      } else {
        this.search_city = false;
      }

    }
}
