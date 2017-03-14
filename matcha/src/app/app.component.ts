import { Component, OnInit }      from '@angular/core';
import { HttpService }    from './http/http.service';
import { User } from './users/user';

let Users: Array<User>;

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  title = 'app works';
  bearer: string;
  constructor(public https: HttpService) { }

  ngOnInit(): void {}

}

