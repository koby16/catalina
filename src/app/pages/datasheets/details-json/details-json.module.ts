import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsJsonRoutingModule } from './details-json-routing.module';
import { DetailsJsonComponent } from './details-json.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [DetailsJsonComponent],
  imports: [
    CommonModule,
    DetailsJsonRoutingModule,
    MatExpansionModule,
    MatListModule,
  ],
  exports: [DetailsJsonComponent]
})
export class DetailsJsonModule { }
