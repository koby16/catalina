import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddJsonRoutingModule } from './add-json-routing.module';
import { AddJsonComponent } from './add-json.component';

import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [AddJsonComponent],
  imports: [
    CommonModule,
    AddJsonRoutingModule,
    MatExpansionModule
  ]
})
export class AddJsonModule {

}
