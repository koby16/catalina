import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddJsonComponent } from './add-json.component';

const routes: Routes = [{ path: '', component: AddJsonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddJsonRoutingModule { }
