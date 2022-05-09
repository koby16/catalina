import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatasheetService {

  private datasheetCollection: AngularFirestoreCollection<any>

  constructor(
    private readonly afs:AngularFirestore
  ) {
    this.datasheetCollection = afs.collection<any>('datasheets')
  }

  onSaveJsonSummary( datasheet: any, devId: string ): Promise<void> {
    return new Promise( async (resolve, reject) => {
      try {
        const id = devId;
        //console.log(id)
        const data = datasheet;
        const result = this.datasheetCollection.doc(id).set(data)
        resolve(result)
      } catch (err) {
        reject(err.message)
      }
    })
  }
}
