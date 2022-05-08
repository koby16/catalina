import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Device } from '../devices/device.interface';
import { Item } from './item.interface';

interface listPhone {
  brand: string;
  marketName: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  items: Observable<Item[]>;
  private itemsCollection: AngularFirestoreCollection<Item>;

  devices: Observable<Device[]>;
  private devicesCollection: AngularFirestoreCollection<Device>;

  constructor( private readonly afs: AngularFirestore ) {
    this.itemsCollection = afs.collection<Item>('items');
    this.getItems();
    this.devicesCollection = afs.collection<Device>('devices');
    this.getDevices();
  }

  onDeleteItem( itemId: string ):Promise<void>{
    return new Promise ( async (resolve, reject ) => {
      try {
        const result = await this.itemsCollection.doc(itemId).delete();
        resolve(result)
      } catch (err){
        reject(err.message)
      }
    });
  }

  onSaveItem( item: Item, itemId: string ): Promise<void> {
    return new Promise( async (resolve, reject) => {
      try {
        const id = itemId || this.afs.createId();
        //console.log(id)
        const data = { id, ...item };
        const result = this.itemsCollection.doc(id).set(data)
        resolve(result)
      } catch (err) {
        reject(err.message)
      }
    })
  }

  private getItems(): void {
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => a.payload.doc.data() as Item ))
    )
  }

  private getDevices(): void {
    this.devices = this.devicesCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => a.payload.doc.data() as Device ))
    )
  }
}