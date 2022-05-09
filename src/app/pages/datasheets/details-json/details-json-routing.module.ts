import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsJsonComponent } from './details-json.component';

const routes: Routes = [{ path: '', component: DetailsJsonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsJsonRoutingModule { }
