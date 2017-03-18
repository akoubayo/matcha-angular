import { Component, OnInit, Input }                 from '@angular/core';
import { Profil }                                   from '../../profils';
import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./chartCustom.scss';

@Component({
  selector: 'charCustom',
  templateUrl: './chartCustom.html',
})

export class ChartCustomComponent implements OnInit{

    private  _init = false;

    @Input() profil:Profil;
    @Input() chartTab:Array<Object>;

    ngOnInit(): void {
    }

    ngAfterViewInit() {
      for(let chart of this.chartTab) {
        this.loadPieCharts(chart.id);
        this.updatePieCharts(chart);
      }
    }

    public loadPieCharts(id) {
      let chart = jQuery('#' + id + '');
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 64,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 5,
        lineCap: 'round',
      });
    this._init = true;
  }

  public updatePieCharts(chart:Object) {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };
    $('#' + chart.id + '').data('easyPieChart').update(chart.pourc);
    //$('#nbShow').data('easyPieChart').update(this.profil.nbshows);
  }
}
