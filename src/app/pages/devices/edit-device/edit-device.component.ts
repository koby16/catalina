import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {

  deviceForm: FormGroup;
  device = null;

  constructor( 
    private router: Router, 
    private fb: FormBuilder,
    private deviceSrv: DeviceService ) {
    const navigation = this.router.getCurrentNavigation();
    this.device = navigation?.extras?.state?.value
   }

  ngOnInit(): void {
    this.initForm();

    if ( typeof this.device === 'undefined' ){
      this.router.navigate(['devices/device-list'])
    } else {
      this.deviceForm.patchValue(this.device)
    }
  }

  onGoToBackList(): void{
    this.router.navigate(['devices/device-list'])
  }

  onSave(): void {
    console.log('Saved', this.deviceForm.value)
    if (this.deviceForm.valid) {
      const device = this.deviceForm.value;
      const deviceId = this.device?.id;
      this.deviceSrv.onSaveDevice(device, deviceId)
      alert('Edited')
    } else {
      alert('Not edited')
    }
  }

  private initForm(): void {
    this.deviceForm = this.fb.group({
      id: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]]
    })
  }

}
