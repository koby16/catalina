import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddJsonRoutingModule } from './add-json-routing.module';
import { AddJsonComponent } from './add-json.component';


@NgModule({
  declarations: [AddJsonComponent],
  imports: [
    CommonModule,
    AddJsonRoutingModule
  ]
})
export class AddJsonModule {

}
