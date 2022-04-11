import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DashboardDeviceComponent } from './dashboard-device/dashboard-device.component';
import { DetailsDeviceComponent } from './details-device/details-device.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      { path: 'device-list', component: DeviceListComponent },
      { path: 'add-device', component: AddDeviceComponent },
      { path: 'edit-device', component: EditDeviceComponent },
      { path: 'details-device', component: DetailsDeviceComponent },
      { path: 'dashboard-devices', component: DashboardDeviceComponent },
      { path: '**', redirectTo: 'device-list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
