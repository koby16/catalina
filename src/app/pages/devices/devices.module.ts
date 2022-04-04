import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';

import { DeviceListComponent } from './device-list/device-list.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';
import { DetailsDeviceComponent } from './details-device/details-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ 
    DeviceListComponent, 
    AddDeviceComponent, 
    EditDeviceComponent, 
    DetailsDeviceComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class DevicesModule { }
