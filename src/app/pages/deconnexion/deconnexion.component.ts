import {Component}                                           from '@angular/core';
import {HttpService}                                         from '../../theme/services/httpService/httpService.service'
import { Router, ActivatedRoute, Params }                    from '@angular/router';
import {CookieService}                                       from 'angular2-cookie/core';

@Component({
  selector: 'deconnexion',
  template: '',
})
export class Deconnexion implements OnInit{

  public https:HttpService;

  constructor(https:HttpService, private router: Router, private _cookieService:CookieService) {
        console.log('============================je suis ici')
        this._cookieService.put('bearer', '');
        this.router.navigate(['/login']);
        https.resetToken();
  }

  ngOnInit(): void {
    console.log('**************************************************je suis ici');
  }

}
