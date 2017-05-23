import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tailleConvert'})
export class TailleConvertPipe implements PipeTransform {
  transform(taille: any, args: string[]): any {
    if (!taille) return taille;
      console.log(Math.floor(+taille/100));
      let ret = Math.floor(+taille/100) + 'm'
      let decimal = +taille/100 - Math.floor(+taille/100);
      ret += Math.floor((decimal*100));
    return ret;
  }
}
