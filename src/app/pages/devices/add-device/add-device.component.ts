import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Device } from '../device.interface';
import { DeviceService } from '../device.service';

interface Brand {
  value: string;
  viewValue: string;
}

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  deviceForm: FormGroup;

  brands: Brand[] = [
    {value: 'Xiaomi', viewValue: 'Xiaomi'},
    {value: 'Samsung', viewValue: 'Samsung'},
    {value: 'Apple', viewValue: 'Apple'},
    {value: 'Motorola', viewValue: 'Motorola'},
    {value: 'Honor', viewValue: 'Honor'},
  ];

  types: Type[] = [
    {value: 'cpe', viewValue: 'CPE'},
    {value: 'smartphone', viewValue: 'Smartphone'},
    {value: 'tracker', viewValue: 'Tracker'},
    {value: 'iot', viewValue: 'IoT'}
  ];

  constructor( 
    private router: Router, 
    private fb: FormBuilder,
    private deviceSrv: DeviceService ) { }

  ngOnInit(): void {
    this.initForm()
  }

  onSave(): void {
    console.log('Saved', this.deviceForm.value)
    if (this.deviceForm.valid) {
      const device = this.deviceForm.value;
      device.maxTec = this.getMaxTec(device)
      const deviceId = null
      this.deviceSrv.onSaveDevice(device, deviceId)
      alert('Added')
      this.onGoToBackList()
    } else {
      alert('Not added')
    }
  }

  onGoToBackList(): void{
    this.router.navigate(['devices/device-list'])
  }

  private initForm(): void {
    this.deviceForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      marketName: ['', [Validators.required]],
      deviceType: ['', [Validators.required]],
      gsm: [false, [Validators.required]],
      umts: [false, [Validators.required]],
      lte: [false, [Validators.required]],
      nr: [false, [Validators.required]],
      maxTec: ''
    })
    
  }

  getMaxTec(device: Device): string {

    if ( device.nr == true) {
      return "5G"
    } else if ( device.lte == true && device.nr == false){
      return "4G"
    } else if ( device.umts == true && device.lte == false  && device.nr == false) {
      return "3G"
    } else if ( device.gsm == true && device.umts == false && device.lte == false  && device.nr == false) {
      return "2G"
    } else {
      return "undefined"
    }
  }

  

}


