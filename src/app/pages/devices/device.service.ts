import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Device, FileUpload } from './device.interface';
import { map } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private basePath = '/uploads'

  devices: Observable<Device[]>;
  private devicesCollection: AngularFirestoreCollection<Device>;

  constructor( 
    private readonly afs: AngularFirestore,
    private storage: AngularFireStorage
    ) {
    this.devicesCollection = afs.collection<Device>('devices');
    this.getDevices();
  }

  onDeleteDevice( devId: string ):Promise<void>{
    return new Promise ( async (resolve, reject ) => {
      try {
        const result = await this.devicesCollection.doc(devId).delete();
        resolve(result)
      } catch (err){
        reject(err.message)
      }
    });
  }

  onSaveDevice( device: Device, devId: string ): Promise<void> {
    return new Promise( async (resolve, reject) => {
      try {
        const id = devId || this.afs.createId();
        //console.log(id)
        const data = { id, ...device };
        const result = this.devicesCollection.doc(id).set(data)
        resolve(result)
      } catch (err) {
        reject(err.message)
      }
    })
  }

  private getDevices(): void {
    this.devices = this.devicesCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => a.payload.doc.data() as Device ))
    )
  }

  pushFileToStorage(fileUpload: FileUpload, device: Device, devId: string): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          device.urlPicture = downloadURL
          this.onSaveDevice(device, devId)
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
}
