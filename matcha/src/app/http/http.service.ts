import { Injectable } from '@angular/core';
import { Http,  Headers, BaseRequestOptions, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx'
import 'rxjs/add/operator/map'
import { OnInit }      from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../users/user';

@Injectable()
export class HttpService implements OnInit{

  public  bearer: string = '';
  public  headers: Headers = new Headers();
  constructor(private http: Http) {
       this.headers.append('Content-Type', 'application/json');
  }

  public getBearer() {
    let data = {
                "grant_type":"password",
                "client_id":"2",
                "client_secret":"rpIIGlkqiihxbzguHxy13ij1jOODxObYYorMF84H",
                "username":"damien.altman421@gmail.com",
                "password":"25594378"
       }
      return this.http.post(`http://localhost:8000/oauth/token`,data,{headers:this.headers})

  }

  ngOnInit(): void {
    console.log('titi');
  }

  public extractData(res: Response) {
    let Users: Array<User> = [];
    //console.log(res.json());
    res = res.json().profils;

    for (let body in res) {
      Users.push(new User(res[body]));
    }
    return Users || { };
  }

  public list(Users: Array<User>, offset:number = 0, limit:number = 20): Observable<User[]> {
    if(this.bearer != '') {
     return this.http.get('http://localhost:8000/profils?offset='+ offset + '&limit=' + limit,{headers:this.headers})
      .map(this.extractData)
      .catch(res => {
        return Observable.throw(res.json().error || 'Server error');
      });
    }
  }
}
