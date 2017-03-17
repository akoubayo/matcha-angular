// import { NgModule }      from '@angular/core';
// import { CommonModule }  from '@angular/common';
// import { ProfilsComponent } from './profils.component';
// import { routing } from './profils.routing';


// import { NgaModule } from '../../theme/nga.module';

// @NgModule({
//   imports: [
//     CommonModule,
//     NgaModule,
//     routing
//   ],
//   declarations: [
//     ProfilsComponent,
//   ]
// })
// export class ProfilsModule {}

import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { CKEditorModule }       from 'ng2-ckeditor';
import { NgaModule }            from '../../theme/nga.module';

import { routing }              from './profils.routing';
import { ProfilsComponent }     from './profils.component';
import { UserComponent }        from './component/user/user.component';
import { ListProfilsComponent } from './component/listprofils/listProfils.component';
import { ChartCustomComponent}  from './component/chartCustom/chartCustom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    CKEditorModule,
    routing
  ],
  declarations: [
    ProfilsComponent,
    UserComponent,
    ListProfilsComponent,
    ChartCustomComponent,
  ]
})
export class ProfilsModule {
}

