import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'birthdayConvert'})
export class BirthdayConvertPipe implements PipeTransform {
  transform(birthday: any, args: string[]): any {
    if (!birthday) return birthday;
    let b = birthday.split('-');
    console.log(b.length);
    if(b.length == 3) {
        b = new Date(b[0], (b[1]-1), b[2]);
        let ageDifMs = Date.now() - b.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    return;
  }
}
