import {Component}                                   from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator}     from '../../theme/validators';
import {HttpService}                                 from '../../theme/services/httpService/httpService.service'
import {  DomSanitizer, SafeResourceUrl, SafeUrl }   from '@angular/platform-browser';
import { Router, ActivatedRoute, Params }            from '@angular/router';

import 'style-loader!./register.scss';

@Component({
  selector: 'register',
  templateUrl: './register.html',
})
export class Register {

  public form:FormGroup;
  public first_name:AbstractControl;
  public pseudo:AbstarctControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public sexe:AbstractControl;

  public submitted:boolean = false;

  constructor(fb:FormBuilder, public https:HttpService, private sanitizer: DomSanitizer, private router: Router) {

    this.form = fb.group({
      'first_name': ['damien', Validators.compose([Validators.required, Validators.minLength(4), Validators])],
      'email': ['damien.altman42@gmail.com', Validators.compose([Validators.required, EmailValidator.validate])],
      'pseudo': ['damien', Validators.compose([Validators.required, Validators.minLength(4)])],
      'sexe': ['', Validators.compose([Validators.required])],
      'passwords': fb.group({
        'password': ['25594378', Validators.compose([Validators.required, Validators.minLength(6)])],
        'repeatPassword': ['25594378', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });
    console.log('*********');
    console.log(sanitizer.bypassSecurityTrustHtml(this.form.controls['first_name'])));
    this.first_name = this.form.controls['first_name'];
    this.email = this.form.controls['email'];
    this.pseudo = this.form.controls['pseudo'];
    this.sexe = this.form.controls['sexe'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];

  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
        console.log(values)
        console.log(values.first_name)
        values.name = "dam";
        values.password = values.passwords.password;
        this.https.createUser(values).subscribe(resp => {
          if(resp.id_profils)
          {
            let data = {
                  "username":values.email,
                  "password":values.passwords.password,
                  "grant_type":'password',
                  "client_id":2,
                  "client_secret":'rpIIGlkqiihxbzguHxy13ij1jOODxObYYorMF84H'
            };
            this.https.getBearer(data).subscribe(
                response => {
                  let resp = response.json();
                  this.https.bearer = resp.access_token;
                  this.https.headers.append('Authorization', 'Bearer ' + this.https.bearer);
                  this.router.navigate(['/pages/profils']);
            });
          }
        })
    }
  }
}
