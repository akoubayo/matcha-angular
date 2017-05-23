// import { NgModule }        from '@angular/core';
// import { routing }         from './google.routing';
// import { GoogleComponent } from './google.component';

// @NgModule({
//     imports: [
//         routing
//     ],
//     declarations: [
//         GoogleComponent
//     ],
//     providers: [

//     ]
// })
// export class GoogleModule { }
import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { FormsModule }                   from '@angular/forms';
import { routing }                       from './geolocation.routing';

import { GoogleMapDirective }            from './directives/google-map.directive';
import { GoogleMapMarkerDirective }      from './directives/google-map-marker.directive';

 import { nglocationService }              from './services/browser-location.service';
import { GeolocationService }            from './services/geolocation.service';
import { GeocodingService }              from './services/geocoding.service';

import { GeolocationComponent }                  from './geolocation.component';
import { HttpModule, XSRFStrategy } from '@angular/http';

export class NoXSRFStrategy {
  configureRequest(req: Request) {
    // Remove `x-xsrf-token` from request headers
  }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        GeolocationComponent,
         GoogleMapDirective,
         GoogleMapMarkerDirective
    ],
    providers: [
        nglocationService,
        GeolocationService,
        GeocodingService,
        { provide: XSRFStrategy, useFactory: () => new NoXSRFStrategy() }
    ],
    bootstrap: [GeolocationComponent]
})
export class GeolocationModule { }
