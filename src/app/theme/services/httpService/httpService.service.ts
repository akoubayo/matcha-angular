import { Injectable } from '@angular/core';
import { Http,  Headers, BaseRequestOptions, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx'
import 'rxjs/add/operator/map'
import { OnInit }      from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Profil }     from '../../../pages/profils/profils'
import { Notif }       from '../../components/baMsgCenter/notif';

@Injectable()
export class HttpService implements OnInit{

  public  bearer: string = '';
  public  headers: Headers = new Headers();

  constructor(private http: Http) {
       this.headers.append('Content-Type', 'application/json');
  }

  public getBearer(data) {
    console.log('................................')
    console.log(data);
    // let datas = {
    //             "grant_type":"password",
    //             "client_id":"2",
    //             "client_secret":"rpIIGlkqiihxbzguHxy13ij1jOODxObYYorMF84H",
    //             "username":"damien.altman421@gmail.com",
    //             "password":"25594378"
    //    }
      return this.http.post(`http://localhost:8000/oauth/token`,data,{headers:this.headers})
                      .map(resp => {
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

  public list(Users: Array<Profil>, offset:number = 0, limit:number = 20): Observable<Profil[]> {
    if(this.bearer != '') {
     return this.http.get('http://localhost:8000/profils?offset='+ offset + '&limit=' + limit,{headers:this.headers})
      .map(this.extractData)
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
    }
  }

  public getProfil(id:number): Observable<Profil> {
    if(this.bearer != '') {
     return this.http.get('http://localhost:8000/profils/' + id, {headers:this.headers})
      .map(res => {
        res = res.json()
        return new Profil(res);
      })
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
    }
  }

  public updateProfil(data){
    if(this.bearer != '') {
     return this.http.put('http://localhost:8000/profils/me',JSON.stringify(data), {headers:this.headers})
      .map(res => {
      })
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
    }
  }

  public addTags(data){
    if(this.bearer != '') {
     return this.http.post('http://localhost:8000/tags',JSON.stringify(data), {headers:this.headers})
      .map(res => {
        return res = res.json();
      })
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
    }
  }

  public deleteTags(id){
    if(this.bearer != '') {
     return this.http.delete('http://localhost:8000/tags/' + id, {headers:this.headers})
      .map(res => {
      })
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
    }
  }

  public getNotif(): Observable<Notif[]> {
    if(this.bearer != '') {
     return this.http.get('http://localhost:8000/notifs/me' ,{headers:this.headers})
      .map(res => {
        return res = res.json();
      })
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
    }
  }
}
