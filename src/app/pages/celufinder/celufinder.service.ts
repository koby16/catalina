import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Device } from '../devices/device.interface';

@Injectable({
  providedIn: 'root'
})
export class CelufinderService {

  devices: Observable<Device[]>;
  private devicesCollection: AngularFirestoreCollection<Device>;

  constructor( private readonly afs: AngularFirestore ) {
    this.devicesCollection = afs.collection<Device>('devices');
    this.getDevices();
  }
  
  private getDevices(): void {
    this.devices = this.devicesCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => a.payload.doc.data() as Device ))
    )
  }
}
