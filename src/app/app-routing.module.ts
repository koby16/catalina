import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'datasheets',
    loadChildren: () => import('./pages/datasheets/datasheets.module').then( m => m.DatasheetsModule)
  },
  {
    path: 'devices',
    loadChildren: () => import('./pages/devices/devices.module').then( m => m.DevicesModule )
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
