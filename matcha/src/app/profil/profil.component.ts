import { Component, OnInit }      from '@angular/core';
import { HttpService }            from '../http/http.service';
import { DomSanitizer }           from '@angular/platform-browser';
import { User }                   from '../users/user';
import { MdIconRegistry   }           from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})

export class ProfilComponent implements OnInit{

  title = 'app works';
  bearer: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {}

}
