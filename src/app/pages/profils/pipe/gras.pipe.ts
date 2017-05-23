import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tailleConvert'})
export class GrasConvertPipe implements PipeTransform {
  transform(taille: any, args: string[]): any {
    if (!taille) return taille;
      let ret = '<strong>taille</strong>;
    return ret;
  }
}
