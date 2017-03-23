import { Injectable } from '@angular/core';
import { Http,  Headers, BaseRequestOptions, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx'
import 'rxjs/add/operator/map'
import { OnInit }      from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Profil }     from '../../../pages/profils/profils'
import { Notif }       from '../../components/baMsgCenter/notif';

import { Router, ActivatedRoute, Params } from '@angular/router';

let bearer = '';
let headers: Headers = new Headers();

@Injectable()
export class HttpService implements OnInit{

  public  bearer: string = '';
  public  headers: Headers = new Headers();

  constructor(private http: Http, private router: Router) {
       console.log('===================  SERVICE_HTTP  ==========================');
       this.headers.append('Content-Type', 'application/json');
       headers.append('Content-Type', 'application/json');
  }

  public getBearer(data) {
      return this.http.post(`http://localhost:8000/oauth/token`,data,{headers:headers})
                      .map(resp => {
                            let res = resp.json();
                            bearer = res.access_token;
                            this.bearer = res.access_token;
                            this.headers.append('Authorization', 'Bearer ' + this.bearer);
                            headers.append('Authorization', 'Bearer ' + this.bearer);
                        return resp;
                      })
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

  public list(Users: Array<Profil>, offset:number = 0, limit:number = 20): Observable<Profil[]> {
     return this.http.get('http://localhost:8000/profils?offset='+ offset + '&limit=' + limit,{headers:headers})
      .map(this.extractData)
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
  }

  public getProfil(id:number): Observable<Profil> {
     return this.http.get('http://localhost:8000/profils/' + id, {headers:headers})
      .map(res => {
        res = res.json()
        return new Profil(res);
      })
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
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

  public getNotif(): Observable<Notif[]> {
     return this.http.get('http://localhost:8000/notifs/me' ,{headers:headers})
      .map(res => {
        return res = res.json();
      })
      .catch(res => {
        this.router.navigate(['/login']);
        return Observable.throw(res || 'Server error');
      });
  }
}
