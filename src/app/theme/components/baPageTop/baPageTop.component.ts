import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import { OnInit }         from '@angular/core';
import 'style-loader!./baPageTop.scss';

let imgPro = '';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
})

export class BaPageTop implements OnInit{

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public imgProfil = '';

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.imgProfil = imgPro;
  }

   ngOnInit(): void {
     imgPro = this.imgProfil;

      // this.sub = this.route.params.subscribe(params => {
      //   this.id = params['id'];
      //   this.getprofil();
      // });

    }


  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public setImgProfil(src){
    imgPro = src;
    this.imgProfil = src;
    console.log('je suis ici');
  }

  public getImgProfil() {
    return imgPro;
  }
}
