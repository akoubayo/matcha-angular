import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { HttpService } from './theme/services/httpService/httpService.service';

@Injectable()
export class AboutUsersResolve implements Resolve<any> {

  constructor(private service: HttpService,private router: Router) {}

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    return this.service.promiseValidUser().then(users => users).catch(err => {
        this.router.navigate(['/login']);
    });
  }

}
