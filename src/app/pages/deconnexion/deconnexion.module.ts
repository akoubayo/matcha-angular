import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule }     from '../../theme/nga.module';

import { Deconnexion }   from './deconnexion.component';
import { routing }       from './deconnexion.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  providers:[],
  declarations: [
    Deconnexion
  ]
})
export class DeconnexionModule {}
