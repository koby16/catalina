import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddJsonRoutingModule } from './add-json-routing.module';
import { AddJsonComponent } from './add-json.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [AddJsonComponent],
  imports: [
    CommonModule,
    AddJsonRoutingModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule
  ]
})
export class AddJsonModule {

}
