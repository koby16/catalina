import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDatasheetComponent } from './add-datasheet.component';

const routes: Routes = [{ path: '', component: AddDatasheetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDatasheetRoutingModule { }
