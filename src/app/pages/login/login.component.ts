import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {HttpService}        from '../../theme/services/httpService/httpService.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public https:HttpService;

  constructor(fb:FormBuilder, https:HttpService, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.https = https;
    console.log('=============')
    $.getJSON("http://localhost:8000/geoloc", function(response) {
      console.log(response)
    });
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      let data = {
                  "username":this.email.value,
                  "password":this.password.value,
                  "grant_type":'password',
                  "client_id":2,
                  "client_secret":'rpIIGlkqiihxbzguHxy13ij1jOODxObYYorMF84H'
                };
      this.https.getBearer(data).subscribe(
        response => {
          let resp = response.json();
          this.router.navigate(['/pages/profils']);
      });
    }
  }
}
