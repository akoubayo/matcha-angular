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

  constructor(private _baMsgCenterService:BaMsgCenterService, public https: HttpService) {
    this.messages = this._baMsgCenterService.getMessages();
    setInterval(() => {
      this.https.getNotif().subscribe(
        response => {
          this.notif = response;
        },
        error => {
          console.log('error')
          console.log(error)
        });
    }, 5000);
  }

}
