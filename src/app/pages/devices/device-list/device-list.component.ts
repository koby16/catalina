import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { DeviceService } from '../device.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  defaultImage = "https://play-lh.googleusercontent.com/jMYUEwByxu5_G-VRYLpY-wWoSX9L-H62mjn8puy8MJuYTwSoUiUACPo4uTSmK2uKrIo"

  devices$ = this.deviceSrv.devices

  displayedColumns: string[] = ['urlPicture', 'brand', 'model', 'marketName', 'maxTec', 'star']
  dataSource = new MatTableDataSource();

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  constructor(
    private router: Router,
    private deviceSrv: DeviceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.devices$.subscribe( res => this.dataSource.data = res )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onGoToDetailDevice(item: any, deviceId: string): void{
    this.navigationExtras.state.value = item
    this.router.navigate(['devices/details-device', deviceId], this.navigationExtras)
  }

  onGoToAddJson(deviceId:string): void{
    this.router.navigate(['datasheets/add-json', deviceId])
  }

  onGoToEditDevice(item: any): void{
    this.navigationExtras.state.value = item
    this.router.navigate(['devices/edit-device'], this.navigationExtras)    
  }

  onGoToAddtDevice(){
    this.router.navigate(['devices/add-device'], this.navigationExtras)
  }

  async onGoToDelete(deviceId:string): Promise<void>{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to remove this device?'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if ( res ){
        try {
          this.deviceSrv.onDeleteDevice(deviceId)
          alert('Deleted')
        } catch (err){
          console.log(err)
        }
      }
    })
  }

}
