import { Injectable }     from '@angular/core';
import {CookieService}    from 'angular2-cookie/core';
import { Http,  Headers, BaseRequestOptions, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx'
import 'rxjs/add/operator/map'
import { OnInit }         from '@angular/core';
import { Observable }     from 'rxjs/Observable';

import { Profil }         from '../../../pages/profils/profils'
import { Notif }          from '../../components/baMsgCenter/notif';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
let bearer = '';
let headers: Headers = new Headers();
let me;

@Injectable()
export class HttpService implements OnInit {

  public  bearer: string = '';
  public  headers: Headers = new Headers();
  public  me = me

  constructor(private http: Http, private router: Router, private _cookieService:CookieService) {
      // On charge les header
      this.headers.append('Content-Type', 'application/json');
      headers.append('Content-Type', 'application/json');
      // Test du token
      if (this._cookieService.get('bearer')) {
        bearer       = this._cookieService.get('bearer');
        this.bearer  = bearer;
      // Update des HEADER
        this.headers.append('Authorization', 'Bearer ' + this.bearer);
        headers.append('Authorization', 'Bearer ' + this.bearer);
      }
  }

  /* *
  *  Function pour recupérer un token valid
  *  data = ident de connexion
  */
  public getBearer(data) {
      this.headers.delete('Authorization');
      headers.delete('Authorization');
      return this.http.post(`http://localhost:8000/oauth/token`,data,{headers:headers})
                      .map(resp => {
                            let res     = resp.json();
                            bearer      = res.access_token;
                            this.bearer = res.access_token;

                            this.headers.append('Authorization', 'Bearer ' + this.bearer);
                            headers.append('Authorization', 'Bearer ' + this.bearer);
                            this._cookieService.put('bearer', this.bearer);
                        return resp;
                      })
                      .catch(res => {
                        return Observable.throw(res.json().error || 'Server error');
                      });
  }

  ngOnInit(): void {

  }

  public extractData(res: Response) {
    let Users: Array<Profil> = [];
    res = res.json().profils;
    for (let body in res) {
      Users.push(new Profil(res[body]));
    }
    return Users || { };
  }

  public list(search = '', offset:number = 0, limit:number = 20): Observable<Profil[]> {
     return this.http.get('http://localhost:8000/profils?'+ search +'&offset='+ offset + '&limit=' + limit,{headers:headers})
      .map(this.extractData)
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
  }

  public getProfil(id): Observable<Profil> {
     return this.http.get('http://localhost:8000/profils/' + id, {headers:headers})
      .map(res => {
        res = res.json()
        return new Profil(res);
      })
      .catch(res => {
        if(res.status == 401) {
          this.goLoginPage();
        }
        return Observable.throw(res.json().error || 'Server error');
      });
  }

  public promiseValidUser() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8000/profils/me', {headers:headers})
            .map(res => {
              this.me = res.json();
              me = this.me;
              resolve('Ok');
            })
            .catch(res => {
              reject('reject');
              return Observable.throw(res.json().error || 'Server error');
        }).subscribe();
    });
  }

  public updateProfil(data){
     return this.http.put('http://localhost:8000/profils/me',JSON.stringify(data), {headers:headers})
      .map(res => {
      })
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
  }

  public addTags(data){
     return this.http.post('http://localhost:8000/tags',JSON.stringify(data), {headers:headers})
      .map(res => {
        return res = res.json();
      })
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
  }

  public deleteTags(id){
     return this.http.delete('http://localhost:8000/tags/' + id, {headers:headers})
      .map(res => {
      })
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
  }

  public createUser(data) {
     return this.http.post('http://localhost:8000/users', JSON.stringify(data), {headers:headers})
      .map(res => {
        return res = res.json();
      })
      .catch(res => {
        return Observable.throw(res || 'Server error');
      });
  }

  public goLoginPage() {
    this._cookieService.put('bearer', '');
    this.router.navigate(['/login']);
  }

  public resetToken()
  {
    this.headers.delete('Authorization');
    headers.delete('Authorization');
    this.bearer = '';
    bearer = '';
  }

  public setLike(id)
  {
    return this.http.post('http://localhost:8000/likes', JSON.stringify(id), {headers:headers})
      .map(res => {
        return res.json();
      })
      .catch(res => {
        return Observable.throw(res || 'Server error');
      })
  }

  public updatePhotoProfil(id)
  {
    return this.http.put('http://localhost:8000/photos/'+id,JSON.stringify({profil:'1'}), {headers:headers})
      .map(res => {
        return res.json();
      })
      .catch(res => {
        return Observable.throw(res || 'Server error');
      })
  }

  /**
  *  Les notifications
  **/

  public getNotif(id): Observable<Notif[]> {
     return this.http.get('http://localhost:8000/notifs/' + id ,{headers:headers})
      .map(res => {
        return res = res.json();
      })
      .catch(res => {
        return Observable.throw(res || 'Server error');
      });
  }

  public markNotifRead(id)
  {
    return this.http.put('http://localhost:8000/notifs/'+ id,JSON.stringify({}), {headers:headers})
      .map(res => {
        return res.json();
      })
      .catch(res => {
        return Observable.throw(res || 'Server error');
      })
  }

  public searchCity(search) {
    return this.http.get('http://localhost:8000/searchville?ville=' + search , {headers:headers})
      .map(res => {
        return res = res.json();
      })
      .catch(res => {
        return Observable.throw(res || 'Server error');
    });
  }
}
