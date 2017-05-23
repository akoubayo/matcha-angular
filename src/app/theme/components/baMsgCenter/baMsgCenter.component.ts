import {Component}                   from '@angular/core';
import { HttpService }               from '../../services/httpService/httpService.service';
import {BaMsgCenterService}          from './baMsgCenter.service';
import { Notif }                     from './notif';
@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter {

  public notifications:Array<Object> = [];
  public messages:Array<Object>;
  public notif:Array<Notif>;
  public nbNotif:number = 0;

  constructor(private _baMsgCenterService:BaMsgCenterService, public https: HttpService) {
    this.messages = this._baMsgCenterService.getMessages();
    this.https.getNotif('nonlu').subscribe(
        response => {
          this.notif = response;
          this.nbNotif = this.notif.length;
        },
        error => {
          console.log('error')
          console.log(error)
        });
    setInterval(() => {
      this.https.getNotif('nonlu').subscribe(
        response => {
          this.notif = response;
          this.nbNotif = this.notif.length;
        },
        error => {
          console.log('error')
          console.log(error)
        });
    }, 15000);
    $('.dropdown').addClass('open');
  }

  public testClick(){
    console.log('je suis ici');
  }

  public dontClose($event) {
    $event.stopPropagation();
  }

  public markNotifRead(id) {
    this.https.markNotifRead(id).subscribe(data => {
      this.notif = data;
      this.nbNotif = data.length;
    })
  }
}
