import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'add', loadChildren: () => import('./add-datasheet/add-datasheet.module').then(m => m.AddDatasheetModule) },
      { path: 'add-json/:id', loadChildren: () => import('./add-json/add-json.module').then(m => m.AddJsonModule)},
      { path: 'details', loadChildren: () => import('./details-json/details-json.module').then(m => m.DetailsJsonModule) }
    ]
  },
  
]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasheetsRoutingModule { }
