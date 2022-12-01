import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';


const routes: Routes = [
  { 
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'piloto/:id', loadChildren: () => import('./preferences/preferences.module').then(m => m.PreferencesModule) }
    ]
  }
]
    

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CelufinderRoutingModule { }
