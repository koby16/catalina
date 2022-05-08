import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      { path: 'add', loadChildren: () => import('./add-datasheet/add-datasheet.module').then(m => m.AddDatasheetModule) },
      { path: 'add-json', loadChildren: () => import('./add-json/add-json.module').then(m => m.AddJsonModule)}
    ]
  }
]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasheetsRoutingModule { }
