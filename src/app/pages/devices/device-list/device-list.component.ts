import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices$ = this.deviceSrv.devices

  displayedColumns: string[] = ['brand', 'model', 'marketName', 'star']
  dataSource = new MatTableDataSource();

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  constructor(
    private router: Router,
    private deviceSrv: DeviceService
  ) { }

  ngOnInit(): void {
    this.devices$.subscribe( res => this.dataSource.data = res )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onGoToDetailDevice(item: any): void{
    this.navigationExtras.state.value = item
    this.router.navigate(['devices/details-device'], this.navigationExtras)
  }

  onGoToEditDevice(item: any): void{
    this.navigationExtras.state.value = item
    this.router.navigate(['devices/edit-device'], this.navigationExtras)    
  }

  onGoToAddtDevice(){
    this.router.navigate(['devices/add-device'], this.navigationExtras)
  }

  async onGoToDelete(deviceId:string): Promise<void>{
    try {
      await this.deviceSrv.onDeleteDevice(deviceId)
      alert('Deleted')
    } catch (err){
      console.log(err)
    }
  }

}
