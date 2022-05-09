import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Device } from '../device.interface';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-details-device',
  templateUrl: './details-device.component.html',
  styleUrls: ['./details-device.component.css']
})
export class DetailsDeviceComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  device: Device = null

  constructor( 
    private router: Router,
    private deviceSrv: DeviceService ) {
    const navigation = this.router.getCurrentNavigation();
    this.device = navigation?.extras?.state?.value
    console.log(this.device)
  }

  ngOnInit(): void {
    if (typeof this.device === 'undefined') {
      this.router.navigate(['devices/dashboard-devices']);
    }
  }

  onGoToEditDevice(): void{
    this.navigationExtras.state.value = this.device
    this.router.navigate(['devices/edit-device'], this.navigationExtras)    
  }

  onGoToBackList(): void{
    this.router.navigate(['devices/dashboard-devices'])
  }

  async onDelete(): Promise<void>{
    try {
      await this.deviceSrv.onDeleteDevice(this.device.id)
      alert('Deleted')
      this.onGoToBackList()
    } catch (err){
      console.log(err)
    }
  }


}
