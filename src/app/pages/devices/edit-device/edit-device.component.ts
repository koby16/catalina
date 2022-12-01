import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device, FileUpload } from '../device.interface';
import { DeviceService } from '../device.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  defaultImage = "https://play-lh.googleusercontent.com/jMYUEwByxu5_G-VRYLpY-wWoSX9L-H62mjn8puy8MJuYTwSoUiUACPo4uTSmK2uKrIo"

  deviceForm: FormGroup;
  device = null;

  types: Type[] = [
    {value: 'cpe', viewValue: 'CPE'},
    {value: 'smartphone', viewValue: 'Smartphone'},
    {value: 'tracker', viewValue: 'Tracker'},
    {value: 'iot', viewValue: 'IoT'}
  ];
  
  stockTypes: Type[] = [
    {value: 'Precio Especial', viewValue: 'Precio Especial'},
    {value: 'Liquidacion', viewValue: 'Liquidacion'},
    {value: 'General', viewValue: 'General'},
  ];

  constructor( 
    private router: Router, 
    private fb: FormBuilder,
    private deviceSrv: DeviceService,
    public dialog: MatDialog ) {
    const navigation = this.router.getCurrentNavigation();
    this.device = navigation?.extras?.state?.value
    console.log(this.device)
   }

  ngOnInit(): void {
    this.initForm();

    if ( typeof this.device === 'undefined' ){
      this.router.navigate(['devices/dashboard'])
    } else {
      this.deviceForm.patchValue(this.device)
    }
  }

  onGoToBackList(): void{
    this.router.navigate(['devices/dashboard'])
  }

  onSave(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: 'Are you sure to edit this device?'
    });
    dialogRef.afterClosed().subscribe( res => {
      //console.log('Saved', this.deviceForm.getRawValue())
      if ( res ){
        if (this.deviceForm.valid) {
          const device = this.deviceForm.getRawValue();
          device.maxTec = this.getMaxTec(device)
          const deviceId = this.device.id
          this.deviceSrv.onSaveDevice(device, deviceId)
          alert('Edited')
          this.onGoToBackList()
        } else {
          alert('Not edited')
        }
      }
    })
  }

  private initForm(): void {
    this.deviceForm = this.fb.group({
      brand: [{value: '', disabled: true}, [Validators.required]],
      model: [{value: '', disabled: true}, [Validators.required]],
      marketName: ['', [Validators.required]],
      deviceType: ['', [Validators.required]],
      stockType: ['', [Validators.required]],
      gsm: [false, [Validators.required]],
      umts: [false, [Validators.required]],
      lte: [false, [Validators.required]],
      nr: [false, [Validators.required]],
      maxTec: '',
      cfPerformance: [0, [Validators.required, Validators.min(0)]],
      cfCamera: [0, [Validators.required]],
      cfBattery: [0, [Validators.required]],
      cfDesign: [0, [Validators.required]],
      cfScreen: [0, [Validators.required]],
      cfAudio: [0, [Validators.required]],
      cfConnectivity: [0, [Validators.required]],
      cfOs: [0, [Validators.required]],
      price74: [0, [Validators.required]],
      storePR: [false, [Validators.required]],
      storeSM: [false, [Validators.required]],
      storeCL: [false, [Validators.required]],
      urlPicture: ''
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.deviceSrv.pushFileToStorage(this.currentFileUpload, this.device, this.device.id).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  }

  

}
